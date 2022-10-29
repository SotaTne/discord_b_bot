const fs = require("fs");

const first_b_data = JSON.parse(
  fs.readFileSync("./data/b_.json", "utf-8") || "null"
);
var b_data = first_b_data == null ? {} : first_b_data;
const data_update = () => {
  if (b_data == null) {
    b_data = {};
  }
  const old_b_data = b_data;
  fs.writeFile("./data/b_.json", JSON.stringify(b_data), (err) => {
    if (err) {
      console.log("err");
      console.log(err);
    } else {
      b_data = JSON.parse(fs.readFileSync("./data/b_.json", "utf-8") || "null");
      if (b_data != old_b_data) {
        b_data = old_b_data;
        data_update();
      } else {
      }
    }
  });
};

const data_update_2 = () => {
  if (b_data == null) {
    b_data = {};
  }
  fs.writeFile("./data/b_.json", JSON.stringify(b_data), (err) => {
    if (err) {
      console.log("err");
      console.log(err);
    }
  });
};

const remove_data_int = (remove_number_input) => {
  var remove_number = String(remove_number_input);
  if (b_data[remove_number] != null) {
    delete b_data[remove_number];
  } else {
    return false;
  }
  data_update();
  return true;
};

const change_remove_data = (remove_number_input) => {
  var remove_number = String(remove_number_input);
  if (b_data[remove_number] != null) {
    delete b_data[remove_number];
  } else {
    return false;
  }
  data_update_2();
  return true;
};

const remove_data_str = (remove_name) => {
  for (let i in b_data) {
    if (b_data[i].name == remove_name) {
      remove_data_int(i);
      return true;
    }
  }
  return false;
};

const add_data = ({ number: number, name: name, b_size: b_size }) => {
  const data_num = number;
  const data_name = name;
  const data_b_size = b_size;
  if (data_num == null || data_name == null || data_b_size == null) {
    console.log("err_add_data");
  } else {
    b_data[String(data_num)] = {
      name: data_name,
      b_size: data_b_size,
      number: data_num,
    };
    data_update();
  }
};

const change_add_data = ({ number: number, name: name, b_size: b_size }) => {
  const data_num = number;
  const data_name = name;
  const data_b_size = b_size;
  if (data_num == null || data_name == null || data_b_size == null) {
    console.log("err_add_data");
  } else {
    b_data[String(data_num)] = {
      name: data_name,
      b_size: data_b_size,
      number: data_num,
    };
    data_update_2();
  }
};

const call_data_num = (input_num) => {
  call_num = String(input_num);
  for (let i in b_data) {
    if (i == call_num) {
      return `四桁番号 : ${i} , 名前 : ${b_data[i].name}, バストサイズ:${b_data[i].b_size}`;
    }
  }
  return "四桁番号が存在しません";
};

const call_data = (input_style, input_num) => {
  this.input_style = String(input_style);
  this.input_num = input_num;
  var return_list = [];
  var out_str = "";
  if (input_style == "small") {
    console.log("small");
    for (let i in b_data) {
      if (
        return_list.length < Math.min(input_num, Object.keys(b_data).length)
      ) {
        return_list.push(b_data[i]);
      } else {
        break;
      }
    }
    for (let z = 0; z < return_list.length; z++) {
      for (let i in b_data) {
        for (let j = 0; j < return_list.length; j++) {
          if (
            which_big(return_list[j], b_data[i], false) &&
            return_list.every(function (value) {
              return value != b_data[i];
            })
          ) {
            return_list[j] = b_data[i];
          } else {
          }
        }
      }
    }
    out_str = out_put_str(return_list);
  } else if (input_style === "big") {
    console.log("big");
    for (let i in b_data) {
      if (
        return_list.length < Math.min(input_num, Object.keys(b_data).length)
      ) {
        return_list.push(b_data[i]);
      } else {
        break;
      }
    }
    for (let z = 0; z < return_list.length; z++) {
      for (let i in b_data) {
        for (let j = 0; j < return_list.length; j++) {
          if (
            which_big(return_list[j], b_data[i], true) &&
            return_list.every(function (value) {
              return value != b_data[i];
            })
          ) {
            return_list[j] = b_data[i];
          } else {
          }
        }
      }
    }
    out_str = out_put_str(return_list);
  } else {
    for (let i in b_data) {
      return_list.push(b_data[i]);
    }
    out_str = out_put_str(return_list);
  }
  return out_str;
};

const out_put_str = (input_data) => {
  var out_str = "";
  for (let i = 0; i < input_data.length; i++) {
    if (i != input_data - 1) {
      out_str += `四桁番号 : ${input_data[i].number} , 名前 : ${input_data[i].name}, バストサイズ : ${input_data[i].b_size}\n`;
    } else {
      out_str += `四桁番号 : ${input_data[i].number} , 名前 : ${input_data[i].name}, バストサイズ : ${input_data[i].b_size}`;
    }
  }
  return out_str;
};

const which_big = (input_1, input_2, big_bool) => {
  b_list = ["A", "B", "C", "D", "E", "F", "G"];
  for (let i = 0; i < b_list.length; i++) {
    if (input_2.b_size == b_list[i]) {
      if (big_bool) {
        return false;
        //big
      } else {
        return true;
        //false
      }
    }
    if (input_1.b_size == b_list[i]) {
      if (big_bool) {
        return true;
        //big
      } else {
        return false;
        //false
      }
    }
  }
};

const return_b_size = (input_str) => {
  switch (input_str) {
    case "a":
    case "ａ":
    case "A":
    case "Ａ":
      return "A";
    case "b":
    case "ｂ":
    case "B":
    case "Ｂ":
      return "B";
    case "c":
    case "ｃ":
    case "C":
    case "Ｃ":
      return "C";
    case "d":
    case "ｄ":
    case "D":
    case "Ｄ":
      return "D";
    case "e":
    case "ｅ":
    case "E":
    case "Ｅ":
      return "E";
    case "f":
    case "ｆ":
    case "F":
    case "Ｆ":
      return "F";
    case "g":
    case "ｇ":
    case "G":
    case "Ｇ":
      return "G";
    default:
      return "not supported";
  }
};

module.exports = {
  b_data: b_data,
  remove_data_str: remove_data_str,
  remove_data_int: remove_data_int,
  change_remove_data: change_remove_data,
  data_update: data_update,
  add_data: add_data,
  change_add_data: change_add_data,
  call_data_num: call_data_num,
  call_data: call_data,
  return_b_size: return_b_size,
};
