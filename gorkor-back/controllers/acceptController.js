import { acceptLetter } from "../models/rebirth.js";

//增加数据s
export const addData = async (req, res) => {
  try {
    //账号信息
    const userData = req.body;
    const users = await acceptLetter.create(userData);
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
