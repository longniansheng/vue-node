const express = require("express");

const app = express();

app.set("secret", "fdsfd45656432432$#");

app.use(require("cors")());
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/upload-files"));

require("./plugins/db")(app);
require("./routes/admin")(app);
require("./routes/login")(app);
require("./upload")(app);

app.listen(9090, () => {
  console.log("server listening on 9090");
});
