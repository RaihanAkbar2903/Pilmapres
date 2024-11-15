// server/routes/registrasi.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');  // Mengimpor koneksi database dari db.js
const router = express.Router();

router.post('/', async (req, res) => {
    const { namaLengkap, nim, password, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto } = req.body;

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

                return res.status(409).json({ error: `Registrasi gagal. ${duplicateFields.join(', ')} sudah terdaftar.` });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = `
                INSERT INTO pendaftaran 
                (namaLengkap, nim, password, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [namaLengkap, nim, hashedPassword, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto];

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

module.exports = router;
