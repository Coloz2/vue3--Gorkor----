import request from "@/utils/http.js";

//
export const getQues = async (offset, limit) => {
  return await request.get("/api/qus/require", {
    params: {
      offset,
      limit,
    },
  });
};

//
export const getQuesById = async (id) => {
  return await request.get("/api/qus/id", { params: { id } });
};

export const getDisById = async (id) => {
  return await request.get("/api/dis/find", { params: { id } });
};

export const addDis = async (ctx) => {
  return await request.post("/api/dis/add", ctx);
};
