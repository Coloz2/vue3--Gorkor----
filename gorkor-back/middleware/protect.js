//是否登陆 中间件
export const protect = async (req, res, next) => {
  let token;
  //1 获取token并查看是否存在
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    console.log("=--------------");
    console.log(token);
  }

  if (!token) {
    res.status(401).json({
      status: "401",
      message: "You are not logged in ",
    });
  }

  //验证token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //修改密码  token失效
  const freshUser = await testUsers.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (freshUser.changedTimedtamp(decoded.iat)) {
    res.status(401).json({
      status: "401",
      message: "TOKEN IS INVAILD ",
    });
  }

  //将所有用户数据放在请求体上
  req.user = freshUser.dataValues;
  next();
};
