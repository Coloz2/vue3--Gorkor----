import request from "@/utils/http.js";

//
export const sendLetter = async (data) => {
  return await request.post("/api/accept/send", data);
};
