const { SlashCommandBuilder } = require("discord.js");

const {
  b_data,
  return_b_size,
  change_remove_data,
  change_add_data,
} = require("../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change")
    .setDescription("内容の変更")
    .addIntegerOption((option) =>
      option
        .setName("specify_number")
        .setDescription("変更元の四桁番号を入力してください")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("new_b_size")
        .setDescription(
          "変更したバストサイズ(変更しない場合は入力しなくてよい)"
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("new_number")
        .setDescription(
          "変更した四桁番号(整数で四桁 ex.2519)(変更しない場合は入力しなくてよい)"
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_name")
        .setDescription(
          "変更した(姓と名はつなげる)(変更しない場合は入力しなくてよい)"
        )
    ),
  async execute(interaction) {
    const specify_number = interaction.options.getInteger("specify_number");
    if (b_data[String(specify_number)] == null) {
      //存在しない
      await interaction.reply("変更元の四桁番号が存在しません");
    } else {
      const old_number = specify_number;
      const old_name = b_data[String(specify_number)].name;
      const old_b_size = b_data[String(specify_number)].b_size;
      const new_number = interaction.options.getInteger("new_number");
      const new_name = interaction.options.getString("new_name");
      const new_input_b_size = interaction.options.getString("new_b_size");
      const out_name = new_name == null ? old_name : new_name; //name 終了
      const new_number_bool =
        1000 < new_number &&
        new_number < 4000 &&
        (new_number == old_number || b_data[String(new_number)] == null);
      const out_number =
        new_number == null ? old_number : new_number_bool ? new_number : null;
      const out_number_bool = out_number == null ? false : true; //number 終了
      const new_b_size =
        new_input_b_size == null ? null : return_b_size(new_input_b_size);
      const out_b_size =
        new_b_size == null
          ? old_b_size
          : new_b_size == "A" || "B" || "C" || "D" || "E" || "F" || "G"
          ? new_b_size
          : null;
      const out_b_size_bool = out_b_size == null ? false : true; //b_size 終了 エラーがある
      //remove
      const bool_remove = change_remove_data(specify_number);
      const have_error = () => {
        if (b_data[String(specify_number)] == null) {
          //追加 (specify_number)
          change_add_data({
            number: specify_number,
            name: old_name,
            b_size: old_b_size,
          });
        }
      };
      try {
        if (!bool_remove) {
          //存在しない
          have_error();
          await interaction.reply("変更元の四桁番号が存在しません");
        } else {
          while (b_data[String(specify_number)] != null) {
            var const_new_remove_bool = change_remove_data(specify_number);
          }
          if (out_number_bool && out_b_size_bool) {
            change_add_data({
              number: out_number,
              name: out_name,
              b_size: out_b_size,
            });
            //すべて追加はok
            await interaction.reply("正常に終了しました");
            await interaction.followUp(
              `変更元[名前:${old_name},バストサイズ:${old_b_size},四桁番号:${old_number}]`
            );
            await interaction.followUp(
              `変更後[名前${out_name}:,バストサイズ${out_b_size}:,四桁番号:${out_number}]`
            );
          } else {
            if (!out_number_bool) {
              //numberのみがダメ
              have_error();
              await interaction.reply(
                "変更先の四桁番号が有効な値ではありません"
              );
              if (!out_b_size_bool) {
                //numberとb_sizer両方ダメ
                have_error();
                await interaction.reply(
                  "変更先の四桁番号とバストサイズが有効な値ではありません"
                );
              }
            } else {
              //b_sizeのみダメ
              have_error();
              await interaction.reply(
                "変更先のバストサイズが有効な値ではありません"
              );
            }
          }
        }
      } catch (err) {
        if (b_data[String(specify_number)] == null) {
          //追加 (specify_number)
          have_error();
        } else if (
          b_data[String(specify_number)].name ||
          b_data[String(specify_number)].number ||
          b_data[String(specify_number)].b_size == null
        ) {
          change_remove_data(specify_number);
          have_error();
        }
        await interaction.reply(
          "予期せぬエラーが起きました\n再度データを入力してください"
        );
      }
    }
  },
};
//ok
