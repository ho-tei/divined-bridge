const config = require("../../../config.json");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

const guild = hypixel.getGuild("name", "Divined"); //! hard coded guild name but its whatever

/*setInterval(async () => {
  const linkedData = readFileSync("data/linked.json");
  if (linkedData === undefined) {
    return console.log("No linked data found");
  }

  const linked = JSON.parse(linkedData);
  if (linked === undefined) {
    return console.log("Linked data may be malformed");
  }

  try {
    const guildMembers = guild.members();

    guildMembers.array.forEach(async (member) => {
      if (((Date.now() / 1000) - member.joinedAtTimestamp) > 604800) {
        console.log(">1week");
        const discordID = Object.keys(linked).find((key) => linked[key] === member.uuid);
        if (discordID === undefined) {
          return console.log(`${member} is not linked`);
        }

        // asign role
        try {
          const guild = await global.client.guilds.fetch("1204303173150449696"); //! hard coded guild id!
          const member = await guild.members.fetch(discordID);
          await member.roles.add('1345409650719457312');
          console.log(`Role assigned to ${member.user.tag}`);
        } catch (error) {
          console.error("Error assigning role:", error);
        }

      } else {
        config.log(`${member} has been in the guild for less than a week`);
      }
    });

  } catch (e) {
    console.log(e);
  }
}, 3600000); // 1 hour
*/