import { question } from "../models/rebirth.js";
import { discussions } from "../models/rebirth.js";
export const getAllquestions = async (req, res) => {
  try {
    const { offset, limit } = req.query;

    // 将字符串参数转为数字
    const offsetValue = parseInt(offset) || 0;
    const limitValue = parseInt(limit) || 5;

    const data = await question.findAll({
      offset: offsetValue,
      limit: limitValue,
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

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);

    const data = await question.findAll({
      where: { id },
      raw: true,
    });

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

export const addQuestion = async (req, res) => {
  try {
    const { ctx } = req.body;
    console.log(ctx);
    const result = await question.create({
      text: ctx,
    });
    res.json({
      status: "success",
      ctx,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};
