import { acceptLetter } from "../models/rebirth.js";
import { passer } from "../models/rebirth.js";
import sequelize from "../config/database.js";
//增加数据
export const addData = async (req, res) => {
  try {
    //账号信息
    const { senderId, type } = req.body;
    const data = req.body;
    //如果为随机发送 根据权重算法抽取一个用户
    if (type == "random") {
      const result = await searchPasser(senderId);
      const { id } = result;
      data.receiverId = id;
    }

    // 删除type
    delete data.type;
    //发送
    const send = await acceptLetter.create(data);
    //添加进数据库
    res.json({
      status: "success",
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

  console.log(senderId);
  const totalWeight = weight.filter((item) => item.id !== senderId);
  //用户ID和权重数据
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
    const result = await acceptLetter.findAll({
      where: {
        receiverId: senderId,
      },
      attributes: [
        sequelize.fn("DISTINCT", sequelize.col("senderId")),
        "senderId",
      ],
      raw: true,
    });
    const extractedValues = result.map((item) => item.senderId);

    console.log(extractedValues);
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      res: error,
    });
  }
};
