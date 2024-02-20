import Express from "express";
import comPath from "./middleware/reflection.js";
import homenavRouter from "./routes/HomeNavRoutes.js";
import passerRouter from "./routes/userRoutes.js";
import papperRouter from "./routes/papperRoute.js";
import acceptRouter from "./routes/acceptRoutes.js";
import draftsRouter from "./routes/draftsRoutes.js";
import qusRouter from "./routes/questionRoute.js";
import disRoute from "./routes/disRoutes.js";
import cors from "cors";
import { scheduler } from "./middleware/scheduler.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

const app = Express();

app.use(Express.json());
// 在 Express 中的例子
app.use((req, res, next) => {
  // 替换 '*' 为实际的前端源地址
  const allowedOrigin = "http://localhost:5173";

  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});

app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 启动定时任务
scheduler.start();

///////////////////////////////////////////////////////////////////////////////////////
// path.join(__dirname, `${pat}`);

// 获取当前模块的文件路径;
const __filename = fileURLToPath(import.meta.url);
// 获取目录名
const __dirname = dirname(__filename);
app.use("/images", Express.static(path.join(__dirname, "images")));
app.use("/images", Express.static(comPath("iamges")));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

/////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/frontRender", homenavRouter);
app.use("/api/passer", passerRouter);
app.use("/api/bg", papperRouter);
app.use("/api/accept", acceptRouter);
app.use("/api/drafts", draftsRouter);
app.use("/api/qus", qusRouter);
app.use("/api/dis", disRoute);
export default app;
