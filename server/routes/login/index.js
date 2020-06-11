const assert = require("http-assert");

module.exports = (app) => {
  const AdminUser = require("../../models/AdminUser");

  const bcrypt = require("bcrypt");

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await AdminUser.findOne({ username }).select("+password");

    assert(user, 422, "用户不存在");

    const isValid = bcrypt.compareSync(password, user.password);

    assert(isValid, 422, "密码错误");

    const jwt = require("jsonwebtoken");

    const token = jwt.sign({ id: user._id }, app.get("secret"));

    res.send({ token });
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode).send({ message: err.message });
  });
};
