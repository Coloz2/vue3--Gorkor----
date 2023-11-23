import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const frontNavModel = async () => {
  const frontHomeNav = sequelize.define(
    "frontHomeNav",
    {
      imageUrl: {
        type: DataTypes.STRING, //
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
