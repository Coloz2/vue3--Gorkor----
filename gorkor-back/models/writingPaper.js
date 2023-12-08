import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const writingPaperModel = async () => {
  const writingPaper = sequelize.define(
    "writingPaper",
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group: {
        type: DataTypes.STRING,
        allowNullf: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      //不生成时间
      timestamps: false,
    }
  );

  return writingPaper;
};

export default writingPaperModel;
