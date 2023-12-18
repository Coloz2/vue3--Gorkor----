import { fileURLToPath } from "url";
import fs from "fs";
import { dirname } from "path";
import { frontNav } from "../models/rebirth.js";
import { writingBg } from "../models/rebirth.js";
import path from "path";

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// 获取目录名
const __dirname = dirname(__filename);

// 获取上一级目录
const parentDir = path.resolve(__dirname, "..");

//读取images图片文件夹
const imagesDir = path.join(parentDir, "images", "paper");

const imageFiles = fs.readdirSync(imagesDir);

//将路径复制
imageFiles.forEach(async (filename) => {
  const imgPath = path.join("images", "paper", filename);
  // 插入NavFront表;
  const existingRecord = await writingBg.findOne({
    where: { imageUrl: imgPath },
  });

  try {
    const group = filename.split("-")[0];
    const createdRecord = await writingBg.create({
      imageUrl: imgPath,
      group,
      name: filename.replace(/\.png$|\.jpg$/, ""),
      price: 100,
    });
  } catch (error) {
    console.error("Error creating record:", error);
    // 这里可以处理错误情况
  }
});

// const group = filename.split("-")[0];
// const createdRecord = await writingBg.create({
//   imageUrl: imgPath,
//   group,
//   name: filename.replace(/\.png$|\.jpg$/, ""),
//   price: 100,
// });

// const createdRecord = await frontNav.create({
//   imageUrl: imgPath,
//   title: filename.replace(/\.png$/, ""),
// });
// console.log("Record created successfully:", createdRecord);
// 这里可以进行后续操作
