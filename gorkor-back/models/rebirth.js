import frontNavModel from "./FrontHomeNav.js";
import sequelize from "../config/database.js";
import userSchema from "./user.js";
import writingPaperModel from "./writingPaper.js";
import acceptSchema from "./accept.js";
const frontNav = await frontNavModel();
const passer = await userSchema();
const writingBg = await writingPaperModel();
const acceptLetter = await acceptSchema();

await sequelize.sync({ after: true });

// await userSchema.addColumn("silence", {

// });

console.log("用户模型表刚刚(重新)创建！");
export { frontNav, passer, writingBg, acceptLetter };
