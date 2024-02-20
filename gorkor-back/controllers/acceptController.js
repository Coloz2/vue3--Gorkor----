import { acceptLetter } from "../models/rebirth.js";
import { passer } from "../models/rebirth.js";
import { updateWeight } from "../controllers/userController.js";
import sequelize from "../config/database.js";
//增加数据
export const addData = async (req, res) => {
  try {
    //账号信息
    let { senderId, receiverId } = req.body;
    const data = req.body;
    //如果为随机发送 根据权重算法抽取一个用户
    if (receiverId == "0") {
      const result = await searchPasser(senderId);
      const { id } = result;
      data.receiverId = id;
      receiverId = id;
    }
    //接收Id
    // const { receiverId } = data;
    //判断是否为第一次发送
    const check = await passerNumber(senderId, receiverId);
    console.log("--------------CHECK-----------------");
    console.log(check);
    if (!check) {
      const res = await passer.update(
        { passerCount: sequelize.literal("passerCount + 1") },
        {
          where: {
            id: receiverId,
          },
        }
      );

      const pNumber = await passer.findOne({
        attributes: ["passerCount"],
        where: {
          id: receiverId,
        },
      });
      data.pNumber = pNumber.dataValues.passerCount;
      console.log("------------------------------");
      console.log(res);
    } else {
      data.pNumber = check.dataValues.pNumber;
    }
    //过客人数统计

    // 删除type
    data.isRead = false;
    console.log("-----------ISREAD-----------");
    console.log(data.isRead);
    //发送
    const send = await acceptLetter.create(data);

    //更新未读状态
    const tst = updateWeight(receiverId);

    //添加进数据库
    res.json({
      status: "success",
      data,
      send,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//随机抽取方法
async function searchPasser(senderId) {
  //找到所有用户的权重
  const weight = await passer.findAll({
    attributes: ["id", "weight"],
    order: [["weight", "DESC"]],
    raw: true,
  });

  const totalWeight = weight.filter((item) => item.id !== senderId);
  //用户ID和权重数据
  console.log("--------WEIGHT--------");
  console.log(totalWeight);
  //创建权重数组
  const weightArray = [];
  let weightSum = 0;
  for (const w of totalWeight) {
    weightSum += w.weight;
    weightArray.push(weightSum);
  }

  //根据权重和生成权重随机数
  const random = Math.floor(Math.random() * weightSum);

  //二分查找方法
  function binarySearch(arr, random) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      // console.log(
      //   "中--" +
      //     mid +
      //     "---高--" +
      //     high +
      //     "----低---" +
      //     low +
      //     "----------" +
      //     arr[mid]
      // );
      if (arr[mid] < random) {
        low = mid + 1;
      } else if (arr[mid] > random) {
        high = mid - 1;
      } else {
        return low;
      }
    }

    return low;
  }
  //根据随机数匹配 查找出权重的下标
  const index = binarySearch(weightArray, random);
  return totalWeight[index];
}

//获取数据
export const getLetter = async (req, res) => {
  try {
    const { senderId } = req.query;
    //找出每次交流中距离最近的sendLogin
    const result = await acceptLetter.findAll({
      attributes: [
        "senderId",
        [
          sequelize.fn("MIN", sequelize.col("sendLoginAt")),
          "latestSendLoginAt",
        ],
      ],
      group: ["senderId"],
      where: {
        receiverId: senderId,
        isRead: true,
      },
      raw: true,
    });

    const sendWordArray = [];
    //根据ID获取寄语
    for (const e of result) {
      const sendword = await passer.findAll({
        include: [
          {
            model: acceptLetter,
            attributes: ["pNumber", "sendLoginAt", "content"],
            where: {
              sendLoginAt: e.latestSendLoginAt,
            },
          },
        ],
        attributes: ["id", "sendword", "username"],
        where: {
          id: e.senderId,
        },
        raw: true,
      });
      sendWordArray.push(sendword);
    }
    //数据整合
    // const obj = {};
    // obj.passers = passers;
    // obj.sendWordArray = sendWordArray;
    // const resultObject = obj.passers.map((passer, index) => [
    //   passer,
    //   obj.sendWordArray[index],
    // ]);
    // 使用解构赋值将数组的元素分别取出

    res.json({
      status: "success",
      data: sendWordArray,
      // sendWordArray,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      res: error,
    });
  }
};

//判断是否为第一次发送
async function passerNumber(seId, recId) {
  const result = await acceptLetter.findOne({
    where: {
      senderId: seId,
      receiverId: recId,
    },
  });

  return result;
}

//获取最近的一次数据
export const getCurPasser = async (req, res) => {
  try {
    const { senderId, sendLoginAt } = req.query;
    const result = await acceptLetter.findOne({
      where: {
        senderId,
        sendLoginAt,
      },
      attributes: ["bgUrl", "content", "leCount"],
    });

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.satus(401).json({
      status: "fail",
      res: error,
    });
  }
};

// async function leastLetter(senderId, receiverId) {
//   const res = await acceptLetter.findOne({
//     where: {
//       senderId,
//       receiverId,
//     },
//     attributes: ["bgurl", "content"],
//   });
// }

//查询是否有未读信件
export const anyUnread = async (req, res) => {
  try {
    const { receiverId } = req.query;

    //
    const sendword = await passer.findAll({
      include: [
        {
          model: acceptLetter,
          attributes: ["pNumber", "sendLoginAt", "content"],
          where: {
            receiverId,
            isRead: false,
          },
        },
      ],
      attributes: ["id", "sendword", "username"],
      raw: true,
    });

    // 格式处理;
    const data = sendword.map((item) => {
      const accepts = {};
      for (const key in item) {
        if (key.startsWith("accepts.")) {
          const cleanedKey = key.replace("accepts.", ""); // 去除前缀
          accepts[cleanedKey] = item[key];
        } else {
          accepts[key] = item[key];
        }
      }
      return accepts;
    });

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      res: error,
    });
  }
};

//设置已读
export const alreadyRead = async (req, res) => {
  try {
    const { receiverId } = req.body;
    console.log(req.body.receiverId);
    const result = await acceptLetter.update(
      { isRead: true },
      {
        where: {
          receiverId,
          isRead: false,
        },
      }
    );

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      res: err,
    });
  }
};

//查询信件历史
export const sendHistory = async (req, res) => {
  try {
    const { receiverId, senderId } = req.query;
    const result = await acceptLetter.findAll({
      where: {
        receiverId,
        senderId,
      },
      raw: true,
    });

    const result2 = await acceptLetter.findAll({
      where: {
        receiverId: senderId,
        senderId: receiverId,
      },
      raw: true,
    });
    console.log(result);
    res.json({
      status: "success",
      receive: result,
      send: result2,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      res: error,
    });
  }
};
