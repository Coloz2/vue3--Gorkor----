// const myObject = {
//   key1: ["1", "2", "3"],
//   key2: ["1", "2", "3"],
//   key3: ["1", "2", "3"],
// };

// const valuesArray = Object.values(myObject);

// console.log(valuesArray);
// 输出：['value1', 'value2', 'value3']

const str2 = "纷纷分";
const str3 = "fff    fffff     ffff   fff ";
const getLength = (str) => {
  let charCount = 0;

  // 遍历字符串中的每一个字符
  for (const char of str) {
    if (char.codePointAt(0) > 255) {
      // 汉字或其他非ASCII码字符，算一个完整字符
      charCount += 2;
    } else {
      // 英文字符，算半个字符
      charCount += 0.5;
    }
  }

  return charCount;
};

console.log(str3.split(""));
