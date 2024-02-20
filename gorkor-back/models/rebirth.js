import frontNavModel from "./FrontHomeNav.js";
import sequelize from "../config/database.js";
import userSchema from "./user.js";
import writingPaperModel from "./writingPaper.js";
import acceptSchema from "./accept.js";
import draftsSchema from "./drafts.js";
import questionSchema from "./dailyQuestion.js";
import disSchema from "./discussions.js";

const frontNav = await frontNavModel();
const passer = await userSchema();
const writingBg = await writingPaperModel();
const acceptLetter = await acceptSchema();
const drafts = await draftsSchema();
const question = await questionSchema();
const discussions = await disSchema();

function sbb() {
  const acceptF = sequelize.models.accept;
  const passerF = sequelize.models.userModel;
  const disF = sequelize.models.discussions;
  const quesF = sequelize.models.question;
  //关联表
  passerF.hasMany(acceptF, { foreignKey: "senderId" });
  acceptF.belongsTo(passerF, { foreignKey: "senderId" });

  passerF.hasMany(disF, { foreignKey: "passer_id" });
  disF.belongsTo(passerF, { foreignKey: "passer_id" });

  quesF.hasOne(disF, { foreignKey: "question_id" });
  disF.belongsTo(quesF, { foreignKey: "question_id" });
}

sbb();

await sequelize.sync({ after: true });

// await userSchema.addColumn("silence", {

// });

console.log("用户模型表刚刚(重新)创建！");
export {
  frontNav,
  passer,
  writingBg,
  acceptLetter,
  drafts,
  question,
  discussions,
};
