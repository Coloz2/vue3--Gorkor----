import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const acceptSchema = async () => {
  class acceptModel extends Model {}
  acceptModel.init(
    {
      senderId: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "accept",
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  return acceptModel;
};

export default acceptSchema;
