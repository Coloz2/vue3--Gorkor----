import axios from "axios";
const httpInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//相应拦截器
httpInstance.interceptors.response.use(
  (res) => res,
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误

  (e) => {
    // ElMessage({
    //   type: "warning",
    //   message: e.response.data.message,
    // });
    return Promise.reject(e);
  }
);

export default httpInstance;
