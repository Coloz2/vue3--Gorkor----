import { Op } from "sequelize";
import { drafts } from "../models/rebirth.js";

export const codDrafts = async (req, res) => {
  // const { senderId, content, type, receiverId } = req.body;
  try {
    const data = req.body;
    //获取对象的两个ID
    data.forEach(async (e) => {
      const { senderId, receiverId } = e;
      console.log(receiverId);
      //根据两个ID查找是否有唯一数据 没有就创建

      const [user, created] = await drafts.findOrCreate({
        where: {
          senderId,
          receiverId,
        },
        defaults: e,
      });
      console.log(created);

      //如果没有创建 则更新数据
      if (created === false) {
        const ress = await drafts.update(e, {
          where: {
            senderId,
            receiverId,
          },
        });

        console.log(ress);
      }
    });

    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "faill",
      error,
    });
  }
};

export const getDrafts = async (req, res) => {
  try {
    const { senderId } = req.query;

    const data = await drafts.findAll({
      where: {
        senderId,
        // receiverId: recId || null,
      },
      raw: true,
    });

    //删除ID字段
    data.forEach((e) => {
      delete e.id;
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

export const test = async (req, res) => {
  try {
    const data = req.body;
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
