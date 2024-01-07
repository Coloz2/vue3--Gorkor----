import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const acceptSchema = async () => {
  class acceptModel extends Model {}
  acceptModel.init(
    {
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      bgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sendLoginAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "accept",
      timestamps: false,
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  return acceptModel;
};

export default acceptSchema;
