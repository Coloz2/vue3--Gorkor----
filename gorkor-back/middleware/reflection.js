import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取目录名
const __dirname = dirname(__filename);
// 配置静态文件服务，将 /gorkor-back 映射到 gorkor-back 文件夹

const comPath = (pat) => {
  return path.join(__dirname, `${pat}`);
};

export default comPath;
