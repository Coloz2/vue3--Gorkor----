import Express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { dirname } from "path";
import { frontNav } from "./models/rebirth.js";
import homenavRouter from "./routes/HomeNavRoutes.js";
import cors from "cors";
const app = Express();

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// 获取目录名
const __dirname = dirname(__filename);

//读取images图片文件夹
const imagesDir = path.join(__dirname, "images", "front-nav");

const imageFiles = fs.readdirSync(imagesDir);

//将路径复制
imageFiles.forEach(async (filename) => {
  const imgPath = path.join("gorkor-back", "images", "front-nav", filename);
  // 插入NavFront表;
  const existingRecord = await frontNav.findOne({
    where: { imageUrl: imgPath },
  });

  if (!existingRecord) {
    await frontNav.create({
      imageUrl: imgPath,
      title: filename,
    });
  }
});

app.use(Express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use("/api/frontRender", homenavRouter);

export default app;
