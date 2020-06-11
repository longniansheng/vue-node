module.exports = (app) => {
  const express = require("express");

  const authMid = require("../../midware/auth");
  const resourceMid = require("../../midware/resource");

  const router = express.Router({
    mergeParams: true,
  });

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }

    const data = await req.Model.find().setOptions(queryOptions).limit(0);
    res.send(data);
  });

  router.get("/:id", async (req, res) => {
    const data = await req.Model.findById(req.params.id);
    res.send(data);
  });

  router.delete("/:id", async (req, res) => {
    const data = await req.Model.findByIdAndDelete(req.params.id);
    res.send(data);
  });

  app.use("/admin/api/rest/:resource", authMid(), resourceMid(), router);

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
