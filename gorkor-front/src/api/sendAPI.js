import request from "@/utils/http.js";

//
export const sendLetter = async (data) => {
  return await request.post("/api/accept/send", data);
};

//邮箱 根据过客获取信件
export const getLetterByPasser = async (senderId) => {
  console.log("zero");
  return await request.get("/api/accept/require", {
    params: {
      senderId,
    },
  });
};

//查找最新信件
export const getNewLetter = async (senderId, sendLoginAt) => {
  return await request.get("/api/accept/current", {
    params: {
      senderId,
      sendLoginAt,
    },
  });
};

//是否有未读信件
export const getAnyUnread = async (receiverId) => {
  return await request.get("/api/accept/unread", {
    params: {
      receiverId,
    },
  });
};

//更新已读状态
export const updateReadStatus = async (receiverId) => {
  return await request.post("/api/accept/read", receiverId);
};

//历史
export const getHistory = async (receiverId, senderId) => {
  return await request.get("/api/accept/history", {
    params: {
      receiverId,
      senderId,
    },
  });
};
