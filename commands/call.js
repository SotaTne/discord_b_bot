const { SlashCommandBuilder } = require("discord.js");
const { call_data, call_data_num } = require("../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("call")
    .setDescription("呼び出しをします")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("number")
        .setDescription("四桁番号で指定し、呼び出します")
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("四桁番号を入力してください")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("style")
        .setDescription("呼び出すオプションを指定し、呼び出します")
        .addStringOption((option) =>
          option
            .setName("style")
            .setDescription("呼び出し方を選んでください")
            .addChoices(
              { name: "すべて", value: "all" },
              { name: "大きいサイズをいくつ呼ぶか", value: "big" },
              { name: "小さいサイズをいくつ呼ぶか", value: "small" }
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("call_num")
            .setDescription(
              "いくつ呼ぶか(すべての場合は何を入れてもすべて呼び出す)"
            )
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      if (interaction.options.getSubcommand() === "style") {
        const return_str = call_data(
          interaction.options.getString("style"),
          interaction.options.getInteger("call_num")
        );
        await interaction.reply(String(return_str));
      } else {
        const number = interaction.options.getInteger("number");
        number > 1100 && number < 4000
          ? await interaction.reply(`${call_data_num(number)}`)
          : await interaction.reply("四桁番号が有効な値ではありません");
      }
    } catch (err) {
      await interaction.reply(
        "予期せぬエラーが起きました\n再度データを入力してください"
      );
    }
  },
};
//ok
