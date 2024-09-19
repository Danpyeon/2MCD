const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS 설정

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: '192.168.20.9',
    port: 3306,
    user: 'PJY',
    password: 'qwer1234',
    database: '2mcd_db'
});
connection.connect();

// 서버 실행
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/api/items', (req, res) => {
    const page = parseInt(req.query.page) || 1; // 쿼리에서 페이지 번호 가져옴, 기본값은 1
    const cate = req.query.cate || 'all';
    const limit = 18; // 한 페이지당 항목 수
    const offset = (page - 1) * limit;
    
    console.log(req.query);

    // item_tb와 file_tb 조인하여 필요한 데이터 가져오기
    const query = `
        WITH FILE AS (SELECT * FROM FILE_TB
        WHERE FILE_SEQ IN (SELECT MIN(FILE_SEQ) AS FILE_SEQ FROM FILE_TB
        GROUP BY ITEM_SEQ
        ORDER BY ITEM_SEQ))
        SELECT
        i.item_seq,
        i.detail_category,
        i.brand,
        i.item_name,
        f.item_files 
        FROM item_tb i 
        LEFT OUTER JOIN FILE f ON i.item_seq = f.item_seq
        WHERE i.detail_category = ?
        ORDER BY i.item_seq DESC
        LIMIT ? OFFSET ?`;

    connection.query(query, [cate, limit, offset], (err, rows) => {
        if (err) {
            console.error('DB error:', err);
            res.status(500).json({ error: 'DB 조회 실패' });
        } else {
            res.status(200).json({
                status: 200,
                data: rows,
                page: page,
                cate: cate
            });
        }
    });
});
