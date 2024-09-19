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

// 회원가입 처리 API
app.post('/signUp', (req, res) => {
  let obj = req.body
  
  // const { id, pw, name, nickname, email, phone } = req.body;
    console.log(req.body);
    console.log('1');
  
    // 회원가입 쿼리
    const sql = 'INSERT INTO user_tb (user_id, user_password, user_name, user_nickname, user_mail, user_phone, user_home) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const role = 'user';  // 기본적으로 일반 유저로 설정
    conn.query(sql, [obj.id, obj.pw, obj.name, obj.nickname, obj.email, obj.phone, '이새끼뺀다며'], (err, result) => {
      if (err) {
        console.error('회원가입 중 오류 발생:', err);
        return res.status(500).json({ message: '서버 오류' });
      }
  
      // 회원가입 성공
      return res.status(200).json({ status: 200, message: '회원가입 성공' });
    });
  });

  app.post('/login', (req, res) => {
    let obj = req.body
    console.log(obj)
    // 로그인 쿼리 (유저가 있는지 확인)
    const sql = 'SELECT user_password FROM user_tb WHERE user_id = ?';
    conn.query(sql, [obj.id], (err, result) => {
      if (err) {
        console.error('로그인 중 오류 발생:', err);
        return res.status(500).json({ message: '서버 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '아이디가 존재하지 않습니다.' });
      }

      // 비밀번호 확인 (암호화 없이 평문 비교)
      const storedPw = result[0].user_password;  // result는 배열, 비밀번호는 result[0]에서 가져옴
      console.log('DB 저장된 비밀번호:', storedPw);
      console.log('입력된 비밀번호:', obj.pw);

      if (obj.pw === storedPw) {
        // 비밀번호 일치 (로그인 성공)
        return res.status(200).json({ status: 200, message: '로그인 성공'});
      } else {
        // 비밀번호 불일치 (로그인 실패)
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      }
  });
});0