import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const questionSchema = async () => {
  class questionModel extends Model {}
  questionModel.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sendLoginAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      agree: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      disagree: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "question",
      timestamps: false,
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  return questionModel;
};

export default questionSchema;
