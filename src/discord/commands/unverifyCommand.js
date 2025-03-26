const HypixelDiscordChatBridgeError = require("../../contracts/errorHandler.js");
const { SuccessEmbed } = require("../../contracts/embedHandler.js");
const { writeFileSync, readFileSync } = require("fs");
const { getUsername } = require("../../contracts/API/mowojangAPI.js");
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
  name: "unverify",
  description: "Remove your linked Minecraft account",
  verificationCommand: true,

  execute: async (interaction) => {
    try {
      const linkedData = readFileSync("data/linked.json");
      if (!linkedData) {
        throw new HypixelDiscordChatBridgeError(
          "The linked data file does not exist. Please contact an administrator.",
        );
      }

      const linked = JSON.parse(linkedData);
      if (!linked) {
        throw new HypixelDiscordChatBridgeError(
          "The linked data file is malformed. Please contact an administrator."
        );
      }
      
      const uuid = linked[interaction.user.id];
      if (uuid === undefined) {
        throw new HypixelDiscordChatBridgeError(`You are not verified. Please run /verify to continue.`);
      }
  
      delete linked[interaction.user.id];
      writeFileSync("data/linked.json", JSON.stringify(linked, null, 2));

      const member = interaction.member;
      if (!member) {
        throw new HypixelDiscordChatBridgeError("Could not find your Discord profile. Please try again.");
      }

      const botRole = interaction.guild.members.me.roles.highest;
      const removableRoles = member.roles.chace.filter((role) => role.position < botRole.position);

      await member.roles.remove(removableRoles, "unverified user - roles reset");

      const guestRole = config.verification.guestRole;
      if (guestRole) {
        await member.roles.add(guestRole, "Unverified user - assigned Guest role");
        
      const updateRole = new SuccessEmbed(
        `You have successfully unlinked \`${await getUsername(uuid)}\`. Run \`/verify\` to link a new account.`,
        { text: `by @.kathund | /help [command] for more information`, iconURL: "https://i.imgur.com/uUuZx2E.png" },
      );
      await interaction.followUp({ embeds: [updateRole] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor(15548997)
        .setAuthor({ name: "An Error has occurred" })
        .setDescription(`\`\`\`${error}\`\`\``)
        .setFooter({
          text: `by @.kathund | /help [command] for more information`,
          iconURL: "https://i.imgur.com/uUuZx2E.png",
        });

      await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
