import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const draftsSchema = async () => {
  class draftsModel extends Model {}
  draftsModel.init(
    {
      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      // type: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      receiverId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "drafts",
      timestamps: false,
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  return draftsModel;
};

export default draftsSchema;
