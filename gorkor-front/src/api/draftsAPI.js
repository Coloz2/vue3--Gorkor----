import request from "@/utils/http.js";

//
export const codDrafts = async (data) => {
  console.log(data);
  return await request.post("/api/drafts/save", data);
};

//获取所有数据
export const getDraftsList = async (senderId) => {
  //通过get请求携带params参数
  return await request.get("/api/drafts/find", {
    params: {
      senderId,
    },
  });
};
