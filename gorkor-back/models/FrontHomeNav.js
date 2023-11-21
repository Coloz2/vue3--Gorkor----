import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const frontNavModel = async () => {
  const frontHomeNav = sequelize.define(
    "frontHomeNav",
    {
      imageUrl: {
        type: DataTypes.STRING, // 假设您使用整数作为用户ID
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  return frontHomeNav;
};

export default frontNavModel;
