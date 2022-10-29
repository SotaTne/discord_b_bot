const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Source")
    .addSubcommand((subcommand) =>
      subcommand.setName("hello").setDescription("aa")
    ),
  async execute(interaction) {
    await interaction.reply("Source!");
  },
};
