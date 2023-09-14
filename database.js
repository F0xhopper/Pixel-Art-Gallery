import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const port = 8007;
app.use(cors({ origin: "*" }));

app.use(express.json());

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
app.post("/post", function (req, res) {
  let vv = req.body.message;
  let vvv = req.body.painting;
  connection.query(
    "INSERT INTO gallery(Mesasge,Painting) VALUES(?,?)",
    [vv, vvv],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send("POSTED");
      }
    }
  );
});
