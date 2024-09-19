const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const corsOption = {
  origin: "http://127.0.0.1:5500",
  optionSuccessStatus: 200,
};

const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "192.168.20.9",
  port: 3306,
  user: "NHY",
  password: "nhyy@12344",
  database: "2mcd_db",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(3000, function () {
  // console.log("Listen OK");
});

app.post("/mypageCart", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.id];
  let qry = "";

  qry += "  select i.item_seq, i.item_name, p.item_price  from item_tb i ";
  qry += "  left outer join buy_info_tb b on i.item_seq = b.item_seq ";
  qry += "  left outer join item_price_tb p on i.item_seq = p.item_seq ";
  qry += "  where b.user_id = ? and b.is_delete = 0 ";

  conn.query(qry, dataArr, (err, rs) => {
    let responData = new Object();

    if (err) console.error("err:", err);
    else if (rs[0]) {
      responData.status = 200;
      responData.data = rs;
      res.json(responData);
    } else {
      responData.status = 404;
      responData.data = null;
      res.json(responData);
    }
  });
});

app.post("/deleteCart", (req, res) => {
  let obj = req.body;
  console.log(obj);

  for (let i = 0; i < obj.list.length; i++) {
    conn.query(
      "UPDATE buy_info_tb b SET b.is_delete = 1 WHERE b.item_seq = ? and b.user_id = ? ",
      [obj.list[i], obj.id],
      (err, rs) => {
        let responData = new Object();

        if (err) console.error("err:", err);
        else {
          responData.status = 200;
          res.json(responData);
        }
      }
    );
  }
});
