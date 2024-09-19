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
  user: "KJH",
  password: "qwer1234",
  database: "2mcd_db",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(3000, function () {
    // console.log("Listen OK");
  });

// 회원 정보 불러오기 API
app.post('/mypage', (req, res) => {
    const userId = req.id;  // 쿠키에서 유저 ID를 가져옴
  
    if (!userId) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
  
    const sql = 'SELECT user_id, user_password, user_name, user_nickname, user_email, user_phone FROM user_tb WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('회원 정보 조회 중 오류 발생:', err);
        return res.status(500).json({ message: '서버 오류' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      }
  
      // 유저 정보 반환
      res.status(200).json(result[0]);
    });
  });

  function getCookies(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

// 회원 정보 수정 API
app.post('/info', (req, res) => {
    const userId = req.id; 
    const pw = req.pw;
    const nickname = req.nickname;
    const email = req.email;
    

    if (!userId) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const sql = 'UPDATE user_tb SET user_password = ?, user_nickname = ?, user_email = ? WHERE user_id = ?';
    db.query(sql, [pw, nickname, email, userId], (err, result) => {
        if (err) {
            console.error('회원 정보 수정 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
        }

        // 회원 정보 수정 성공
        res.status(200).json({ status: 200, message: '회원 정보가 성공적으로 수정되었습니다.' });
    });
});
  
