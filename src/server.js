const express = require("express");
const cors = require("cors");
const db = require("./db");

const config = require("./config");
const setupMiddleware = require("./middleware");
const { restRouter } = require("./api/index");

const app = express();
setupMiddleware(app);
db.getConnection();
app.use(cors({ credentials: true, origin: true }));
app.set("port", process.env.PORT || config.port);

app.use("/api", restRouter);

app.all("*", function(req, res) {
  res.json({ ok: "true" });
});

process.on("SIGINT", () => {
  db.disconnect();
  process.exit();
});

module.exports = app;
