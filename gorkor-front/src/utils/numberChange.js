const numberToChinese = (num) => {
  const chineseDigits = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];

  // 将数字转换为字符串，并在前面补零到三位数
  const numStr = String(num).padStart(3, "0");
  console.log(numStr);
  // 遍历每一位数字，进行转换
  const result = numStr
    .split("")
    .map((digit, index) => {
      if (digit === "0" && index === 0) {
        return "零";
      } else {
        return chineseDigits[parseInt(digit, 10)];
      }
    })
    .join("");

  return result || "零"; // 如果结果为空字符串，则返回'零'
};

export default numberToChinese;
