import { passer } from "../models/rebirth.js";
import bcrypt from "bcrypt";
import { acceptLetter } from "../models/rebirth.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
//获取token
const gettoken = (uid) => {
  return jwt.sign({ id: uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//注册
const createPasser = async (req, res) => {
  try {
    //账号信息
    const userData = req.body;
    const users = await passer.create(userData);
    res.json({
      status: "success",
      // resAt: req.requestTime,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//是否为近期登录
// const activeLogin = async (id) => {
//  const
// };

//近期是否收到过信件
// const recAccept = async (id) => {
//   const res = await acceptLetter.findOne({
//     where: {
//       [Op.or]: [
//         {
//           senderId: {
//             [Op.eq]: id,
//           },
//         },
//         {
//           recipientId: {
//             [Op.eq]: id,
//           },
//         },
//       ],
//     },
//   });
//   console.log("----------");
//   if (res) {
//     console.log("1");
//     return true;
//   } else {
//     console.log("2");
//     return false;
//   }
// };

//是否有未读信件
const unread = async (id) => {
  const res = await acceptLetter.findOne({
    where: {
      recipientId: {
        [Op.eq]: id,
      },
    },
    attributes: ["isRead"],
    // 指定要查询的字段
  });
  const isRead = res?.dataValues.isRead;
  if (isRead !== true) {
    return false;
  } else {
    return true;
  }
};

//邮箱邮件数
const emailCount = async (id) => {
  const res = await acceptLetter.count({
    where: {
      recipientId: id,
    },
  });
  return res;
};
//更新用户登录时间
const userWeight = async (id) => {
  const hasUnread = await unread(id);
  // console.log("isRead----------" + isRead);
  const count = await emailCount(id);
  const options = {
    hasUnread,
    count,
  };
  const weight = passer.calculateWeight(options);

  return weight;
};

const jwtToken = async (username, password) => {
  try {
    //获取来自前端的名字，密码
    // 密码为空;
    if (!username || !password) return 400;
    //获取数据库密码
    const { dataValues } = await passer.findOne({
      where: { username },
    });

    //比较
    const isCorrect = await bcrypt.compare(password, dataValues.password);
    if (!dataValues || !isCorrect) return 401;
    //找不到用户名或者密码错误
    const { id, sendword } = dataValues;
    const token = gettoken(dataValues.id);
    return { id, token, sendword };
  } catch (error) {
    console.log(error);
    // res.status(400).json({
    //   status: "fail",
    //   message: error,
    // });
  }
};

//更新权重
const updateWeight = async (id) => {
  const weight = await userWeight(id);
  const res = await passer.update({ weight }, { where: { id } });
  console.log(res);
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await jwtToken(username, password);

  // const filteredDataValues = ress.map((user) => user.dataValues);
  // console.log(filteredDataValues);
  if (result === 400) {
    return res.status(400).json({
      status: "200",
      message: "please provide password and username",
    });
  }

  if (result === 401) {
    return res.status(401).json({
      status: "200",
      password,
      message: "密码错误或用户名不存在",
    });
  }
  const { id, token, sendword } = result;
  console.log("(-----------------------)");
  await updateWeight(id);
  // await passer.update({ lastLoginAt: new Date() }, { where: { id } });
  res.status(200).json({
    status: "success",
    data: {
      id,
      username,
      sendword,
      token,
    },
  });
};

const sildentu = async () => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // 找到三天未登录的用户
    const silentUsers = await passer.findAll({
      where: {
        lastLoginAt: {
          [Op.lt]: threeDaysAgo,
        },
      },
      raw: true,
    });

    if (silentUsers) {
      // 将这些用户标记为沉默用户
      for (const user of silentUsers) {
        console.log(user.id);
        const res = await passer.update(
          { silence: true },
          { where: { id: user.id } }
        );
        console.log(res);
      }
    }

    console.log("沉默用户检查完成");
  } catch (error) {
    console.error("沉默用户检查出错:", error);
  }
};

export const test = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const sss = await passer.update(
      { lastLoginAt: new Date() },
      { where: { id } }
    );
    // const ss = await passer.update({ updatedAt: "33" }, { where: { id } });
    res.status(200).json({
      status: "success",
      sss,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createPasser, login };
