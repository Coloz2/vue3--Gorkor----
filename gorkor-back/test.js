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
const creDate = new Date("2023-02-06T02:40:40Z");
const curDate = new Date("2023-12-07T02:40:40Z");

// 创建三天前的日期对象
const threeDaysAgo = new Date(curDate);
threeDaysAgo.setDate(curDate.getDate() - 3);

// 比较 creDate 是否在三天前之前
if (creDate < threeDaysAgo) {
  console.log("creDate 在三天前之前");
} else {
  console.log("creDate 不在三天前之前");
}
