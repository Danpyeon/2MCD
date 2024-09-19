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

app.get("/itemcontrol", (req, res) => {
  let qry = "";

  qry += " WITH FILE AS (SELECT ITEM_SEQ, ITEM_FILES ";
  qry += "     FROM FILE_TB ";
  qry +=
    "     WHERE FILE_SEQ IN (SELECT MIN(FILE_SEQ) AS FILE_SEQ FROM FILE_TB GROUP BY (ITEM_SEQ))), ";
  qry += " SEARCH AS (SELECT ITEM_SEQ, BRAND, ITEM_NAME ";
  qry += "FROM ITEM_TB WHERE is_delete = 0) ";
  qry += " SELECT SEARCH.ITEM_SEQ, ";
  qry += " SEARCH.ITEM_NAME, ";
  qry +=
    " (SELECT ITEM_FILES FROM FILE WHERE SEARCH.ITEM_SEQ = FILE.ITEM_SEQ) AS FILE_NAME, ";
  qry += "p.ITEM_PRICE ";
  qry +=
    " FROM SEARCH left outer join item_price_tb p on SEARCH.item_seq = p.item_seq ";
  //   qry += " limit 5";

  conn.query(qry, (err, rs) => {
    if (err) console.error("err:", err);
    else if (rs[0]) {
      let responData = new Object();
      responData.status = 200;

      const data = rs.map((row) => ({
        ITEM_SEQ: row.ITEM_SEQ,
        BRAND: row.BRAND,
        ITEM_NAME: row.ITEM_NAME,
        FILE_NAME: Array.from(row.FILE_NAME), // BLOB 데이터를 배열로 변환
        ITEM_PRICE: row.ITEM_PRICE,
      }));
      responData.data = data;
      res.json(responData);
    } else {
      let responData = new Object();
      responData.status = 404;
      responData.data = null;
      res.json(responData);
    }
  });
});

app.post("/deleteItem", (req, res) => {
  let obj = req.body;

  for (let i = 0; i < obj.length; i++) {
    conn.query(
      "UPDATE item_tb t SET t.is_delete = 1 WHERE t.item_seq = ?",
      [obj[i]],
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

app.post("/editItemInfo", (req, res) => {
  let obj = req.body;
  let responData = new Object();
  let data;
  let qry = "";
  qry +=
    "select i.item_seq, i.brand, i.item_name, p.item_price, i.item_material, i.brand, i.top_category, i.detail_category ";
  qry += "from item_tb i ";
  qry += "left outer join item_price_tb p on i.item_seq = p.item_seq ";
  qry += "where i.item_seq = ? ";

  conn.query(qry, [obj.id], (err, rs) => {
    if (err) console.error("err:", err);
    else if (rs[0]) {
      responData.status = 200;
      data = rs.map((row) => ({
        ITEM_SEQ: row.item_seq,
        TOP: row.top_category,
        DETAIL: row.detail_category,
        BRAND: row.brand,
        ITEM_NAME: row.item_name,
        ITEM_PRICE: row.item_price,
        ITEM_MATERIAL: row.item_material,
      }));
      responData.data = data;
      res.json(responData);
    } else {
      responData.status = 404;
      responData.data = null;
      res.json(responData);
    }
  });
});

app.post("/editItemHashtag", (req, res) => {
  qry = "select h.hashtag_name from hashtag_tb h where h.item_seq = ?";

  conn.query(qry, [req.body.id], (err, rs) => {
    if (err) console.error("err:", err);
    else if (rs[0]) {
      let responData = new Object();
      responData.status = 200;
      responData.data = rs;
      res.json(responData);
    }
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/deleteImg", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.id];
  let qry = "DELETE FROM file_tb WHERE item_seq = ?";

  conn.query(qry, dataArr, (err, rs) => {
    if (err) console.error("err:", err);
    else {
      let responData = new Object();
      responData.status = 200;
      res.json(responData);
    }
  });
});

app.post(
  "/updateItemInfoImg",
  upload.fields([{ name: "image" }]),
  (req, res) => {
    const files = req.files;
    const obj = req.body;
    let dataArr = [obj.id, files.image[0].buffer];
    let qry =
      "INSERT INTO file_tb (item_seq, item_files, is_delete) VALUES (?, ?, DEFAULT)";

    conn.query(qry, dataArr, (err, rs) => {
      if (err) console.error("err:", err);
      else {
        let responData = new Object();
        responData.status = 200;
        res.json(responData);
      }
    });
  }
);

app.post("/updateItemInfoPrice", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.price, obj.id];
  let qry;

  if (obj.isCreate === true || obj.isCreate === "true") {
    qry =
      "INSERT INTO item_price_tb (item_seq, item_price, is_delete) VALUES (?, ?, DEFAULT)";
    dataArr = [obj.id, obj.price];
  } else
    qry = "UPDATE item_price_tb t SET t.item_price = ? WHERE t.item_seq = ?";

  conn.query(qry, dataArr, (err, rs) => {
    if (err) console.error("err:", err);
    else {
      let responData = new Object();
      responData.status = 200;
      res.json(responData);
    }
  });
});

app.get("/getLastItemId", (req, res) => {
  let qry = "select item_seq from item_tb order by item_seq desc  limit  1";

  conn.query(qry, (err, rs) => {
    if (err) console.error("err:", err);
    else {
      let responData = new Object();
      responData.status = 200;
      responData.data = rs;
      res.json(responData);
    }
  });
});

app.post("/updateItemInfoTag", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.id, 0];
  let qry =
    "INSERT INTO hashtag_tb (item_seq, hashtag_name, is_delete) VALUES (?, ?, DEFAULT)";

  for (let i = 0; i < obj.tag.length; i++) {
    dataArr[1] = obj.tag[i];
    conn.query(qry, dataArr, (err, rs) => {
      if (err) console.error("err:", err);
    });
  }
});

app.post("/deleteTag", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.id];
  let qry = "DELETE FROM hashtag_tb WHERE item_seq = ?";

  conn.query(qry, dataArr, (err, rs) => {
    if (err) console.error("err:", err);
    else {
      let responData = new Object();
      responData.status = 200;
      res.json(responData);
    }
  });
});

app.post("/updateItemInfoDefault", (req, res) => {
  let obj = req.body;
  let dataArr = [obj.top, obj.detail, obj.brand, obj.name, obj.desc];
  let qry = "";

  if (obj.id) {
    dataArr.push(obj.id);
    qry +=
      "UPDATE item_tb t SET t.top_category = ?, t.detail_category = ?, t.brand = ?, t.item_name = ?, t.item_material = ? WHERE t.item_seq = ?";
  } else
    qry +=
      "INSERT INTO item_tb (top_category, detail_category, brand, item_name, item_material, is_delete) VALUES (?, ?, ?, ?, ?, 0)";

  conn.query(qry, dataArr, (err, rs) => {
    if (err) console.error("err:", err);
    else {
      let responData = new Object();
      responData.status = 200;
      res.json(responData);
    }
  });
});
