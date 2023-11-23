import axios from "axios";
axios.defaults.baseURL = "http://10.11.248.23:3000";
const one = async () => {
  console.log("444");
  return axios.get("/api/frontRender/sb");
};
export { one };
