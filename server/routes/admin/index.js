module.exports = (app) => {
  const express = require("express");

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
    console.log("req.Model.modelName::", req.Model.modelName);
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

  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
};
