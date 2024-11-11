const { SuccessEmbed } = require("../../contracts/embedHandler.js");
const getGarden = require("../../../API/stats/garden.js");
const { getLatestProfile } = require("../../../API/functions/getLatestProfile.js");

module.exports = {
  name: "gardennn",
  description: "lol",
  moderatorOnly: false,
  requiresBot: false,

  execute: async (interaction) => {
    const data = await getLatestProfile("NoInquisLuck", { garden: true });
    const garden = getGarden(data.garden);
    const embed = new SuccessEmbed(`check console`);
    console.log(garden.cropMilesstone)
    await interaction.followUp({
      embeds: [embed],
    });
  },
};
