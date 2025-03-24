const HypixelDiscordChatBridgeError = require("../../contracts/errorHandler.js");
const hypixelRebornAPI = require("../../contracts/API/HypixelRebornAPI.js");
const { writeFileSync, readFileSync } = require("fs");
const config = require("../../../config.json");
const { EmbedBuilder } = require("discord.js");
const { SuccessEmbed } = require("../../contracts/embedHandler.js");

module.exports = {
  name: "verify",
  description: "Connect your Discord account to Minecraft",
  verificationCommand: true,
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction, user, bypassChecks = false) => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const linkedData = readFileSync("data/linked.json");
      if (!linkedData) {
        throw new HypixelDiscordChatBridgeError("The linked data file does not exist. Please contact an administrator.");
      }

      const linked = JSON.parse(linkedData);
      if (!linked) {
        throw new HypixelDiscordChatBridgeError("The linked data file is malformed. Please contact an administrator.");
      }

      if (bypassChecks && user) {
        interaction.user = user;
      }

      if (linked[interaction.user.id]) {
        if (bypassChecks) {
          delete linked[interaction.user.id];
        } else {
          throw new HypixelDiscordChatBridgeError(
            "You are already linked to a Minecraft account. Please run /unverify first."
          );
        }
      }

      const username = interaction.options.getString("name");
      const { socialMedia, nickname, uuid } = await hypixelRebornAPI.getPlayer(username);
      if (Object.values(linked).includes(uuid)) {
        if (bypassChecks) {
          delete linked[Object.keys(linked).find((key) => linked[key] === uuid)];
        } else {
          throw new HypixelDiscordChatBridgeError(
            "This player is already linked to a Discord account. Please contact an administrator."
          );
        }
      }

      const discordUsername = socialMedia.find((media) => media.id === "DISCORD")?.link;
      if (!discordUsername && !bypassChecks) {
        throw new HypixelDiscordChatBridgeError("This player does not have a Discord linked.");
      }

      if (discordUsername?.toLowerCase() !== interaction.user.username.toLowerCase() && !bypassChecks) {
        throw new HypixelDiscordChatBridgeError(
          `The player '${nickname}' has linked their Discord account to a different account ('${discordUsername}').`
        );
      }

      const guild = interaction.guild;
      const linkedRole = guild.roles.cache.get(config.verification.verifiedRole);
      if (!linkedRole) {
        throw new HypixelDiscordChatBridgeError("The verified role does not exist. Please contact an administrator.");
      }

      linked[interaction.user.id] = uuid;
      writeFileSync("data/linked.json", JSON.stringify(linked, null, 2));

      const embed = new SuccessEmbed(
        `${user ? `<@${user.id}>'s` : "Your"} account has been successfully linked to \`${nickname}\``,
        { text: "by @.kathund | /help [command] for more information", iconURL: "https://i.imgur.com/uUuZx2E.png" }
      );

      await interaction.editReply({ embeds: [embed] });

      const updateRolesCommand = require("./updateCommand.js");
      if (!updateRolesCommand) {
        throw new HypixelDiscordChatBridgeError("The update command does not exist. Please contact an administrator.");
      }

      await updateRolesCommand.execute(interaction, user);

    } catch (error) {
      console.log(error);

      error = error
        .toString()
        .replaceAll("Error: [hypixel-api-reborn] ", "")
        .replaceAll(
          "Unprocessable Entity! For help join our Discord Server https://discord.gg/NSEBNMM",
          "This player does not exist. (Mojang API might be down)"
        );

      const errorEmbed = new EmbedBuilder()
        .setColor(15548997)
        .setAuthor({ name: "An Error has occurred" })
        .setDescription(`\`\`\`${error}\`\`\``)
        .setFooter({
          text: `by @.kathund | /help [command] for more information`,
          iconURL: "https://i.imgur.com/uUuZx2E.png",
        });

      await interaction.editReply({ embeds: [errorEmbed] }).catch(console.error);
    }
  },
};
