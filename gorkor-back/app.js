import Express from "express";
import comPath from "./middleware/reflection.js";
import homenavRouter from "./routes/HomeNavRoutes.js";
import passerRouter from "./routes/userRoutes.js";
import papperRouter from "./routes/papperRoute.js";
import acceptRouter from "./routes/acceptRoutes.js";
import cors from "cors";
import { scheduler } from "./middleware/scheduler.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { protect } from "./middleware/protect.js";
const app = Express();

app.use(Express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 启动定时任务
scheduler.start();

///////////////////////////////////////////////////////////////////////////////////////
// path.join(__dirname, `${pat}`);

// 获取当前模块的文件路径;
// const __filename = fileURLToPath(import.meta.url);
// // 获取目录名
// const __dirname = dirname(__filename);
// app.use("/images", Express.static(path.join(__dirname, "images")));
// app.use("/images", Express.static(comPath("iamges")));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

/////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/frontRender", homenavRouter);
app.use("/api/passer", passerRouter);
app.use("/api/bg", papperRouter);
app.use("/api/accept", acceptRouter);
export default app;
