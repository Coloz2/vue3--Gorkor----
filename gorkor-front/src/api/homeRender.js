import request from "@/utils/http.js";

const getFeature = async () => {
  return request.get("/api/frontRender/sb");
};
export { getFeature };
