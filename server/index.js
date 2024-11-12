const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
// Buat koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akademik'
});
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
console.log('Connected to the database');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// // Endpoint untuk mendapatkan data dari database
app.get('/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(results);
    });
});
app.post('/mahasiswa', (req, res) => {
    const { nim, nama, jurusan, angkatan } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan, angkatan) VALUES (?, ?, ?, ?)';
    db.query(sql, [nim, nama, jurusan, angkatan], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(201).json({ message: 'Data berhasil disimpan', data:results});
    });
});