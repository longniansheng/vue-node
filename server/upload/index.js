module.exports = (app) => {
  const multer = require("multer");
  const upload = multer({
    dest: __dirname + "/../upload-files",
  });

  const authMid = require("../midware/auth");

  app.post(
    "/admin/api/upload",
    authMid(),
    upload.single("file"),
    async (req, res) => {
      console.log("step in here upload files");
      const file = req.file;
      file.url = `http://localhost:9090/uploads/${file.filename}`;
      res.send(file);
    }
  );
};
