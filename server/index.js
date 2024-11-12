const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Ganti dengan username MySQL Anda
    password: '', 
    database: 'pilmapres_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

// Registration endpoint
app.post('/registrasi', async (req, res) => {
    const {
        namaLengkap, nim, password, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto
    } = req.body;

    if (!namaLengkap || !nim || !password || !email || !jurusan || !prodi || !programPendidikan) {
        return res.status(400).json({ error: 'Data registrasi tidak lengkap.' });
    }

    try {
        const checkQuery = `SELECT * FROM pendaftaran WHERE nim = ? OR email = ? OR noHp = ? OR namaLengkap = ?`;
        db.query(checkQuery, [nim, email, noHp, namaLengkap], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Gagal memeriksa data registrasi.' });
            }

            if (results.length > 0) {
                const duplicateFields = [];
                if (results.some((row) => row.nim === nim)) duplicateFields.push('NIM');
                if (results.some((row) => row.email === email)) duplicateFields.push('email');
                if (results.some((row) => row.noHp === noHp)) duplicateFields.push('No. HP');
                if (results.some((row) => row.namaLengkap === namaLengkap)) duplicateFields.push('Nama Lengkap');
                
                return res.status(409).json({
                    error: `Registrasi gagal. ${duplicateFields.join(', ')} sudah terdaftar.`
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = `
                INSERT INTO pendaftaran 
                (namaLengkap, nim, password, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                namaLengkap, nim, hashedPassword, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto
            ];

            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Gagal mendaftar. Silakan coba lagi.' });
                }
                res.status(201).json({ message: 'Registrasi berhasil.' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.post('/datapengguna', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Data pengguna tidak lengkap' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const query = 'INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Pengguna berhasil ditambahkan', id: results.insertId });
    });
});

// Endpoint untuk mengedit data pengguna
app.put('/datapengguna/:id_pengguna', async (req, res) => {
    const { id_pengguna } = req.params;
    const { username, password, role } = req.body;
    if (!username || !role) {
        return res.status(400).json({ error: 'Username dan role diperlukan' });
    }
    let query = 'UPDATE pengguna SET username = ?, role = ? WHERE id_pengguna = ?';
    let params = [username, role, id_pengguna];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query = 'UPDATE pengguna SET username = ?, password = ?, role = ? WHERE id_pengguna = ?';
        params = [username, hashedPassword, role, id_pengguna];
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.json({ message: 'Pengguna berhasil diperbarui' });
    });
});

// Endpoint untuk menghapus pengguna
app.delete('/datapengguna/:id_pengguna', (req, res) => {
    const { id_pengguna } = req.params;
    const query = 'DELETE FROM pengguna WHERE id_pengguna = ?';
    db.query(query, [id_pengguna], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.json({ message: 'Pengguna berhasil dihapus' });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});