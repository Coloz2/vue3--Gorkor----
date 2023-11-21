import frontNavModel from "./FrontHomeNav.js";
import sequelize from "../config/database.js";

const frontNav = await frontNavModel();
await sequelize.sync({ after: true });
console.log("用户模型表刚刚(重新)创建！");
export { frontNav };
