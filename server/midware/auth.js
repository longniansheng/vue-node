module.exports = (options) => async (req, res, next) => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser");

  const authorization = req.headers.authorization || "";
  assert(authorization, 401, "请先登录");

  const token = authorization.split(" ").pop();
  assert(!!token, 401, "请先登录");

  const tokenData = jwt.verify(token, req.app.get("secret"));
  assert(tokenData, 401, "请先登录");

  const user = await AdminUser.findById(tokenData.id);
  assert(user, 401, "用户不存在,请先登录");

  next();
};
