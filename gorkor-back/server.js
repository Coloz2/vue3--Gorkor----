import app from "./app.js";
import dotenv from "dotenv";

//找到文件位置
dotenv.config({ path: "./config.env" });
console.log("------------------");
console.log(process.env);
//
//生产与开发环境
const port = process.env.NODE_ENV == "development " ? process.env.PORT : 8000;

console.log(port);
app.listen(port, () => {
  console.log(`App running at ${port}`);
});

console.log(process.argv);
