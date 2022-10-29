const { SlashCommandBuilder } = require("discord.js");
const { return_b_size, add_data, b_data } = require("../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("追加")

    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("四桁番号(整数で四桁 ex.2519)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("名前(姓と名はつなげる)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("b_size")
        .setDescription("バストサイズ(a~g(A~G)の一文字で入力してください)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const number = interaction.options.getInteger("number");
    const name = interaction.options.getString("name");
    const input_b_size = interaction.options.getString("b_size");
    const number_bool = number > 1100 && number < 4000;
    const number_not_exist = b_data[String(number)] == null;
    const b_size_data = return_b_size(input_b_size);
    const b_size =
      b_size_data == "A" || "B" || "C" || "D" || "E" || "F" || "G"
        ? b_size_data
        : null;
    const b_size_bool = b_size == null ? false : true;
    try {
      if (!number_bool) {
        if (!b_size_bool) {
          await interaction.reply(
            "バストサイズと四桁番号の両方が有効なものではありません"
          );
        } else {
          await interaction.reply("四桁番号が有効な値ではありません");
        }
      } else {
        if (!b_size_bool) {
          await interaction.reply("バストサイズが有効な文字ではありません");
        } else {
          if (number_not_exist) {
            add_data({ number: number, name: name, b_size: b_size });
            await interaction.reply("正常に終了しました");
          } else {
            await interaction.reply("既に存在する四桁番号です");
          }
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
