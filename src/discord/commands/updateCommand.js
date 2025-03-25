const HypixelDiscordChatBridgeError = require("../../contracts/errorHandler.js");
const hypixelRebornAPI = require("../../contracts/API/HypixelRebornAPI.js");
const { replaceVariables } = require("../../contracts/helperFunctions.js");
const { SuccessEmbed } = require("../../contracts/embedHandler.js");
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");
const { readFileSync } = require("fs");

module.exports = {
  name: "update",
  verificationCommand: true,
  description: "Update your current roles",

execute: async (interaction, user, bypassInteractionCheck = false) => {
    try {
        if (!bypassInteractionCheck) {
            await interaction.deferReply({ ephemeral: true });
        }

        const linkedData = readFileSync("data/linked.json");
        if (!linkedData) {
            throw new HypixelDiscordChatBridgeError("The linked data file does not exist. Please contact an administrator.");
        }

        const linked = JSON.parse(linkedData);
        if (!linked) {
            throw new HypixelDiscordChatBridgeError("The linked data file is malformed. Please contact an administrator.");
        }

        if (user !== undefined) {
            interaction.user = user;
            interaction.member = await guild.members.fetch(interaction.user.id);
        }

        if (!interaction.member) {
            interaction.member = await guild.members.fetch(interaction.user.id);
        }

        const uuid = linked[interaction.user.id];
        if (!uuid) {
            throw new HypixelDiscordChatBridgeError("You are not linked to a Minecraft account.");
        }

        const [hypixelGuild, player] = await Promise.all([
            hypixelRebornAPI.getGuild("player", bot.username),
            hypixelRebornAPI.getPlayer(uuid),
        ]);

        if (!hypixelGuild) {
            throw new HypixelDiscordChatBridgeError("Guild not found.");
        }

        interaction.member.setNickname(player.nickname, "Updated Roles");

        const updateRoleEmbed = new SuccessEmbed(
            `<@${interaction.user.id}>'s roles have been successfully synced with \`${player.nickname}\`!`,
            { text: `by @.kathund | /help [command] for more information`, iconURL: "https://i.imgur.com/uUuZx2E.png" }
        );

        if (!bypassInteractionCheck) {
            await interaction.editReply({ embeds: [updateRoleEmbed] });
        } else {
            await interaction.followUp({ embeds: [updateRoleEmbed], ephemeral: true });
        }
    } catch (error) {
        const errorEmbed = new EmbedBuilder()
            .setColor(15548997)
            .setAuthor({ name: "An Error has occurred" })
            .setDescription(`\`\`\`${error}\`\`\``)
            .setFooter({
                text: `by @.kathund | /help [command] for more information`,
                iconURL: "https://i.imgur.com/uUuZx2E.png",
            });

        if (!interaction.replied && !interaction.deferred) {
            await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
        } else {
            await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
        }
    }
};
