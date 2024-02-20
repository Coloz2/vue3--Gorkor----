import { discussions } from "../models/rebirth.js";
import { passer } from "../models/rebirth.js";
import { question } from "../models/rebirth.js";

export const getAlldis = async (req, res) => {
  try {
    const { id } = req.query;
    // const { offset, limit } = req.query;

    // 将字符串参数转为数字

    const data = await discussions.findAll({
      where: {
        question_id: id,
      },
      include: [
        {
          model: passer,
          attributes: ["username"], // 选择要返回的用户相关字段
        },
      ],
    });
    //添加进数据库
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};

export const addDis = async (req, res) => {
  try {
    const { id, question_id, content } = req.body;
    const newDis = await discussions.create({
      question_id,
      passer_id: id,
      comment_text: content,
    });
    res.json({
      status: "success",
      data: newDis,
    });
  } catch (error) {
    console.log(error);
  }
};
