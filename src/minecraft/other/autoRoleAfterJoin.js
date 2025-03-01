const minecraftCommand = require("../../contracts/minecraftCommand.js");
const config = require("../../../config.json");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

const guild = hypixel.getGuild("name", "Divined"); // hard coded guild name but its whatever

setInterval(async () => {
  try {
    const guildMembers = guild.members();

    guildMembers.array.forEach(member => {
        if(((Date.now()/1000) - member.joinedAtTimestamp) > 604800) {
            console.log(">1week")
        } else {
            config.log(`${member} has been in the guild for less than a week`)
        }
    });
    // TODO: Get discord username from name if joined over a week ago & role accordingly
  } catch (e) {
    console.log(e);
    /* empty */
  }
}, 600);
