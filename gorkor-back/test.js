// function weightedRandomChoice(choices, weights) {
//   const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
//   const randNum = Math.random() * totalWeight;
//   let cumulativeWeight = 0;

//   for (let i = 0; i < weights.length; i++) {
//     cumulativeWeight += weights[i];
//     if (randNum <= cumulativeWeight) {
//       return choices[i];
//     }
//   }
// }

// // 示例使用
// const users = ["User1", "User2", "User3"];
// const weights = [0.7, 0.6, 0.8];

// const selectedUser = weightedRandomChoice(users, weights);
// console.log("Selected user:", selectedUser);
// 获取数据库中存储的 creDate 和 curDate

// 假设你有一个用户数组
// const users = [
//   { id: 1, weight: 3 },
//   { id: 2, weight: 1 },
//   { id: 3, weight: 5 },
//   // ... 其他用户
// ];

// // 步骤1：计算总权重 9
// const totalWeight = users.reduce((sum, user) => sum + user.weight, 0);

// // console.log(totalWeight);
// // 步骤2：生成随机数
// const randomValue = Math.random() * totalWeight;
// console.log(randomValue);
// // 步骤3：遍历用户并判断
// let cumulativeWeight = 0;
// let selectedUser;

// for (const user of users) {
//   cumulativeWeight += user.weight;
//   if (randomValue <= cumulativeWeight) {
//     selectedUser = user;
//     break;
//   }
// }

// console.log("选择的用户:", selectedUser);

// function numberToChinese(num) {
//   const chineseDigits = [
//     "零",
//     "壹",
//     "贰",
//     "叁",
//     "肆",
//     "伍",
//     "陆",
//     "柒",
//     "捌",
//     "玖",
//   ];

//   // 将数字转换为字符串，并在前面补零到三位数
//   const numStr = String(num).padStart(3, "0");
//   console.log(numStr);
//   // 遍历每一位数字，进行转换
//   const result = numStr
//     .split("")
//     .map((digit, index) => {
//       if (digit === "0" && index === 0) {
//         return "零";
//       } else {
//         return chineseDigits[parseInt(digit, 10)];
//       }
//     })
//     .join("");

//   return result || "零"; // 如果结果为空字符串，则返回'零'
// }

// console.log(numberToChinese(7));

// const responseData = [
//   {
//     id: 1,
//     text: "你多大纳",
//     sendLoginAt: "2024-01-06T07:39:37.000Z",
//   },
//   {
//     id: 2,
//     text: "你多大纳",
//     sendLoginAt: "2024-01-05T07:39:45.000Z",
//   },
//   // ... 其他对象
// ];

// const test = [];

// test.push(...responseData);
// console.log(test);

console.log(8 % 17);
