import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const port = 8002;
app.use(cors({ origin: "*" }));
const startserver = function startserver() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startserver();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "pixel_gallery",
});
connection.connect();

app.get("/xx", function (req, res, next) {
  connection.query("SELECT * FROM gallery", function (error, results, fields) {
    res.send(results);
  });
});
