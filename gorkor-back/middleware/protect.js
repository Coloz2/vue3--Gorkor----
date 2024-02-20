import { promisify } from "util";
import jwt from "jsonwebtoken";
import { passer } from "../models/rebirth.js";
//是否登陆 中间件
export const protect = async (req, res, next) => {
  let token;
  //1 获取token并查看是否存在
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    console.log("=--------------");
    console.log(token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log(token);
  }

  if (!token) {
    res.status(401).json({
      status: "401",
      message: "You are not logged in ",
    });
  }

  //验证token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (error) {
    res.json({
      status: "401",
      message: "The user belonging to this token does no longer exist.",
    });
  }

  next();
};
