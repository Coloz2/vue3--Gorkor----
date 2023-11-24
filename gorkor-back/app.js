import Express from "express";
import comPath from "./middleware/reflection.js";
import homenavRouter from "./routes/HomeNavRoutes.js";
import cors from "cors";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = Express();

app.use(Express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////////////////////////////////////////////////////////////////////////
// path.join(__dirname, `${pat}`);

// 获取当前模块的文件路径;
const __filename = fileURLToPath(import.meta.url);
// 获取目录名
const __dirname = dirname(__filename);
app.use("/images", Express.static(path.join(__dirname, "images")));
// app.use("/images", Express.static(comPath("iamges")));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

/////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/frontRender", homenavRouter);

export default app;
