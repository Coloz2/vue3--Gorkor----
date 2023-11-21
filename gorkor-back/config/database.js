import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gokor-front", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  //默认表名同步模型名称
  define: {
    freezeTableName: true,
  },
});

//测试连接
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
