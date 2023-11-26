import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://10.11.213.182:3000",
});

export default httpInstance;
