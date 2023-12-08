import request from "@/utils/http.js";

const loginAPI = async ({ username, password }) => {
  console.log(username, password);
  return request.post("/api/passer/login", {
    username,
    password,
  });
};

export { loginAPI };
