const { SlashCommandBuilder } = require("discord.js");

const out_message =
  "このボットはスラッシュコマンド(/)を使い様々なことができるbotです\n\nこのボットのコマンドリスト\n\n\n" +
  "add:データを追加できる(四桁番号、名前、バストサイズが必要)\n\n" +
  "call style:データの呼び出しができる(すべてor大きい順or小さい順,いくつ呼び出すか(すべての場合は、何を入力しても変わらない)が必要)\n\n" +
  "call number:データの呼び出しを出席番号を使い出来る(四桁番号が必要)\n\n" +
  "remove from_name:名前をもとの削除できる(名前が必要)\n\n" +
  "remove from_number:四桁番号をもとに削除ができる(四桁番号が必要)\n\n" +
  "change:四桁番号をもとに変更が可能(変更元の四桁番号+好きなオプション(四桁番号,名前,バストサイズから好きなように選ぶ))";

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("ヘルプ"),
  async execute(interaction) {
    await interaction.reply(out_message.toString());
  },
};
