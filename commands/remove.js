const { SlashCommandBuilder } = require("discord.js");

const { remove_data_int, remove_data_str } = require("../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("指定したデータの削除")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("from_name")
        .setDescription("名前を使い削除します")
        .addStringOption((options) =>
          options
            .setName("name")
            .setDescription(
              "データ内の名前以外の場合には、消すことができません"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("from_number")
        .setDescription("四桁番号")
        .addIntegerOption((options) =>
          options
            .setName("number")
            .setDescription(
              "データ内の番号以外の場合には、消すことができません"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      if (interaction.options.getSubcommand() === "from_name") {
        const name = interaction.options.getString("name");
        const bool_remove = remove_data_str(name);
        if (!bool_remove) {
          await interaction.reply("名前がデータ上に存在しません");
        } else {
          await interaction.reply("正常に終了しました");
        }
      } else {
        const number = interaction.options.getInteger("number");
        const number_bool = b_data[String(number)] != null;
        if (number_bool) {
          const bool_remove = remove_data_int(number);
          if (!bool_remove) {
            await interaction.reply("四桁番号がデータ上に存在しません");
          } else {
            await interaction.reply("正常に終了しました");
          }
        } else {
          await interaction.reply("四桁番号が有効な値ではありません");
        }
      }
    } catch (err) {
      await interaction.reply(
        "予期せぬエラーが起きました\n再度データを入力してください"
      );
    }
  },
};
//ok
