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
  const res = await acceptLetter.findAll({
    where: {
      receiverId: {
        [Op.eq]: id,
      },
    },
    attributes: ["isRead"],
    raw: true,
    // 指定要查询的字段
  });

  //查找已读字段
  const isRead = res.some((item) => item.isRead == true);

  if (isRead == true) {
    return true;
  } else {
    return false;
  }
};

//邮箱邮件数
const emailCount = async (id) => {
  const res = await acceptLetter.count({
    where: {
      receiverId: id,
    },
  });
  return res;
};

//token
const jwtToken = async (username, password, req, res) => {
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
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);

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
export const updateWeight = async (id) => {
  //计算权重
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

  const weight = await userWeight(id);
  const res = await passer.update({ weight }, { where: { id } });
  console.log(res);
};

//抽取用户方法

//登录
const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await jwtToken(`${username}`, `${password}`, req, res);

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
  //更新权重
  await updateWeight(id);
  //更新用户登录时间
  await passer.update({ lastLoginAt: new Date() }, { where: { id } });
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

export const test = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      index,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createPasser, login };

// 计算是否有未读 和 信件数量  作为两个参数=> 通过passer的计算权重算法 返回一个权重 => 登录时候更新权重
