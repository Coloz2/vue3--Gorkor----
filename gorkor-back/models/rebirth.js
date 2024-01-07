import frontNavModel from "./FrontHomeNav.js";
import sequelize from "../config/database.js";
import userSchema from "./user.js";
import writingPaperModel from "./writingPaper.js";
import acceptSchema from "./accept.js";
import draftsSchema from "./drafts.js";

const frontNav = await frontNavModel();
const passer = await userSchema();
const writingBg = await writingPaperModel();
const acceptLetter = await acceptSchema();
const drafts = await draftsSchema();

function sbb() {
  const acceptF = sequelize.models.accept;
  const passerF = sequelize.models.userModel;
  //关联表
  acceptF.belongsTo(passerF, { foreignKey: "id" });
  passerF.hasMany(acceptF, { foreignKey: "senderId" });
}

sbb();

await sequelize.sync({ after: true });

// await userSchema.addColumn("silence", {

// });

console.log("用户模型表刚刚(重新)创建！");
export { frontNav, passer, writingBg, acceptLetter, drafts };
