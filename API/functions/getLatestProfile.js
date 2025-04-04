/* eslint-disable no-throw-literal */
const { getUUID } = require("../../src/contracts/API/mowojangAPI.js");
const { getMuseum } = require("./getMuseum.js");
const { getGarden } = require("./getGarden.js");
const { isUuid } = require("../utils/uuid.js");
const config = require("../../config.json");
const axios = require("axios");

const cache = new Map();

async function getLatestProfile(uuid, options = { museum: false, garden: false }) {
  if (!isUuid(uuid)) {
    uuid = await getUUID(uuid).catch((error) => {
      throw error;
    });
  }

  if (cache.has(uuid)) {
    const data = cache.get(uuid);

    if (data.last_save + 300000 > Date.now()) {
      return data;
    }
  }

  const [{ data: playerRes }, { data: profileRes }] = await Promise.all([
    axios.get(`https://api.hypixel.net/v2/player?key=${config.minecraft.API.hypixelAPIkey}&uuid=${uuid}`),
    axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${config.minecraft.API.hypixelAPIkey}&uuid=${uuid}`),
  ]).catch((error) => {
    throw error?.response?.data?.cause ?? "Request to Hypixel API failed. Please try again!";
  });

  if (playerRes.success === false || profileRes.success === false) {
    throw "Request to Hypixel API failed. Please try again!";
  }

  if (playerRes.player == null) {
    throw "Player not found. It looks like this player has never joined the Hypixel.";
  }

  if (profileRes.profiles == null || profileRes.profiles.length == 0) {
    throw "Player has no SkyBlock profiles.";
  }

  const profileData = profileRes.profiles.find((a) => a.selected) || null;
  if (profileData == null) {
    throw "Player does not have selected profile.";
  }

  const profile = profileData.members[uuid];
  if (profile === null) {
    throw "Uh oh, this player is not in this Skyblock profile.";
  }

  const output = {
    last_save: Date.now(),
    profiles: profileRes.profiles,
    profile: profile,
    profileData: profileData,
    playerRes: playerRes.player,
    uuid: uuid,
    ...(options.museum ? await getMuseum(profileData.profile_id, uuid) : {}),
    ...(options.garden ? await getGarden(profileData.profile_id) : {}),
  };

  cache.set(uuid, output);

  return output;
}

module.exports = { getLatestProfile };
