const express = require("express");
const app = express();
const cors = require("cors");
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

app.post("/search", (req, res) => {
  let obj = req.body;
  let dataArr = [];
  let qry = "";
  qry += "  WITH FILE AS (SELECT ITEM_SEQ, ITEM_FILES ";
  qry += "    FROM FILE_TB ";
  qry += "    WHERE FILE_SEQ IN (SELECT MIN(FILE_SEQ) AS FILE_SEQ ";
  qry += "                       FROM FILE_TB ";
  qry += "                       GROUP BY (ITEM_SEQ))), ";
  qry += "SEARCH AS (SELECT ITEM_SEQ  ";
  qry += "           , BRAND   ";
  qry += "           , ITEM_NAME  ";
  qry += "      FROM ITEM_TB ";
  qry += "      WHERE ITEM_SEQ IN (SELECT DISTINCT ITEM_SEQ ";
  qry += "                         FROM (SELECT ITEM.ITEM_SEQ AS ITEM_SEQ ";
  qry += "                                    , ITEM_NAME     AS ITEM ";
  qry +=
    "                               FROM ITEM_TB ITEM where ITEM.is_delete = 0 ";
  qry += "                               UNION ";
  qry += "                               SELECT HASH.ITEM_SEQ AS ITEM_SEQ ";
  qry += "                                    , HASHTAG_NAME  AS ITEM ";
  qry +=
    "                               FROM HASHTAG_TB HASH) AS SEARCH_TABLE ";
  qry += "                         WHERE 1 = 1 ";

  if (obj.detailCategory === "none") {
    qry += `AND ITEM LIKE ? `;
    dataArr.push("%" + obj.item + "%");
  } else {
    qry += `AND detail_category = ? `;
    dataArr.push(obj.detailCategory);
  }

  qry += `ORDER BY ITEM_SEQ `;
  qry += `    ) `;
  qry += `    ) `;
  qry += `SELECT SEARCH.ITEM_SEQ, `;
  qry += `       SEARCH.BRAND, `;
  qry += `       SEARCH.ITEM_NAME, `;
  qry += `       (SELECT ITEM_FILES FROM FILE WHERE SEARCH.ITEM_SEQ = FILE.ITEM_SEQ) AS FILE_NAME `;
  qry += `FROM SEARCH `;
  qry += `limit ? , 6 `;

  dataArr.push((obj.page - 1) * 6);

  conn.query(qry, dataArr, (err, rs) => {
    if (err) console.error("err:", err);
    else if (rs[0]) {
      let responData = new Object();
      responData.status = 200;

      const data = rs.map((row) => ({
        ITEM_SEQ: row.ITEM_SEQ,
        BRAND: row.BRAND,
        ITEM_NAME: row.ITEM_NAME,
        FILE_NAME: Array.from(row.FILE_NAME), // BLOB 데이터를 배열로 변환
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
