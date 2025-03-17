const updateRolesCommand = require("../commands/forceUpdateEveryone.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const Logger = require("../../Logger.js");
const cron = require("node-cron");
const { readFileSync } = require("fs");

if (config.verification.autoUpdater) {
  Logger.discordMessage(`RoleSync ready, executing every ${config.verification.autoUpdaterInterval} hours.`);

  const linkedData = readFileSync("data/linked.json");
  if (linkedData === undefined) {
    return Logger.errorMessage("No linked data found");
  }

  const linked = JSON.parse(linkedData);
  if (linked === undefined) {
    return Logger.errorMessage("Linked data may be malformed");
  }

  try {
    hypixel.getGuild("name", "Divined").then((guild) => {
      guild.members.forEach(async (member) => {
        if ((Date.now() - member.joinedAtTimestamp) > 604800) {
          const discordID = Object.keys(linked).find((key) => linked[key] === member.uuid);
          if (discordID === undefined) {
            return Logger.warnMessage(`${member} is not linked`);
          }
  
          // asign role
          try {

            const member = await global.guild.members.fetch(discordID);
            await member.roles.add('1345409650719457312');
            Logger.discordMessage(`Role assigned to ${member.user.tag}`);
          } catch (error) {
            Logger.errorMessage("Error assigning role:", error);
          }
  
        } else {
          Logger.warnMessage(`${member} has been in the guild for less than a week`);
        }
      });
    });

  } catch (e) {
    Logger.errorMessage(e);
  }

  cron.schedule(`0 */${config.verification.autoUpdaterInterval} * * *`, async () => {
    Logger.discordMessage("Executing RoleSync...");
    await updateRolesCommand.execute(null, true);
    Logger.discordMessage("RoleSync successfully executed.");
  });

  
}