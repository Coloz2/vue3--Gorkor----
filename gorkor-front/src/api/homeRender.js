import request from "@/utils/http.js";

export const getFeature = async () => {
  return request.get("/api/frontRender/sb");
};

export const getPapperBg = async () => {
  return request.get("/api/bg/papper");
};
