import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const disSchema = async () => {
  class disModel extends Model {}
  disModel.init(
    {
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      passer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recoverAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "discussions",
      timestamps: false,
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  return disModel;
};

export default disSchema;
