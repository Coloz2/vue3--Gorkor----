import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = async () => {
  class userModel extends Model {
    changedTimedtamp(JWTTime) {
      if (this.updatedAt) {
        //把时间转换成十进制
        const changedTimed = parseInt(this.updatedAt.getTime() / 1000, 10);
        console.log(this.updatedAt);
        console.log(JWTTime);
        console.log(changedTimed);
        //token时间 小于 最近更新时间
        return JWTTime < changedTimed;
      }
      return false;
    }

    createPasswrodResetToken() {
      const resetToken = crypto.pseudoRandomBytes(32).toString("hex");
      this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      //ten min
      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
      console.log(this.passwordResetToken);
      console.log(this.passwordResetExpires);
      return resetToken;
    }

    async correctPassWord(cpwd) {
      return await bcrypt.compare(cpwd, this.password);
    }

    //计算权重
    static calculateWeight(options) {
      const { hasUnread = false, count = 0 } = options;
      console.log("--------------------------------------");
      console.log("--------------------------------------");
      console.log("READ---------------" + hasUnread);
      // 如果有未查看信件、没有登录、邮箱邮件数为5，总权重为0
      if (hasUnread || count === 5) return 0;
      //新用户权重最大
      // if (newUser == true) return 1;
      // 根据其他规则计算权重
      let weight = 0;
      // 根据信封数
      switch (count) {
        case 0:
          weight += 5;
          break;
        case 1:
          weight += 4;
          break;
        case 2:
          weight += 3;
          break;
        case 3:
          weight += 2;
          break;
        case 4:
          weight += 1;
          break;
      }
      //根据近期是否收到信件
      // if (!isAccept) {
      //   weight += 0.4;
      // 更多规则...
      return weight;
    }
  }

  userModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // 或 DataTypes.UUIDV1
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //接收信件的数量
      passerCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      //虚拟字段 确认密码
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          isConfirmed(value) {
            if (value !== this.password) {
              throw new Error("Password and confirmation do not match");
            }
          },
        },
      },
      sendword: {
        type: DataTypes.STRING,
        defaultValue: "落花无情流水有意",
      },
      weight: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      silence: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "userModel",
      //不生成时间
      timestamps: false,
      // 其他模型配置，例如表名和时间戳字段
    }
  );

  // 密码加密;
  userModel.beforeCreate(async (userModel) => {
    const hashPassword = await bcrypt.hash(userModel.password, 10);
    userModel.password = hashPassword;
    const cid = userModel.id.split("-").shift();
    userModel.dataValues.id = cid;
  });

  // userModel.beforeSave(async (userModel) => {
  //   console.log("5555");
  //   const hashPassword = await bcrypt.hash(userModel.password, 10);
  //   userModel.password = hashPassword;
  // });

  return userModel;
};

export default userSchema;
