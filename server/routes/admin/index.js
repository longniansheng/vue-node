module.exports = (app) => {
  const express = require("express");

  const router = express.Router();

  const Category = require("../../models/Category");

  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.get("/categories", async (req, res) => {
    const data = await Category.find().populate("parent").limit(0);
    res.send(data);
  });

  router.get("/categories/:id", async (req, res) => {
    const data = await Category.findById(req.params.id);
    res.send(data);
  });

  router.delete("/categories/:id", async (req, res) => {
    const data = await Category.findByIdAndDelete(req.params.id);
    res.send(data);
  });
  app.use("/admin/api", router);
};
