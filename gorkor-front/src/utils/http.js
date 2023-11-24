import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://10.11.248.23:3000",
});

export default httpInstance;
