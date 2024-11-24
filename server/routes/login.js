const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = 'mySuperSecretKey';

router.post('/', async (req, res) => {
    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).json({ error: 'NIM/Username dan password diperlukan.' });
    }

    try {
        // Coba login sebagai Mahasiswa terlebih dahulu menggunakan NIM di tabel pendaftaran
        const queryMahasiswa = 'SELECT * FROM pendaftaran WHERE nim = ?';
        db.query(queryMahasiswa, [credential], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Gagal memproses login.' });
            }
            
            if (results.length > 0) {
                
                const user = results[0];
                const [dataFromDb] = await db.promise().query('SELECT * FROM pengguna WHERE id_pengguna = ?', [user.id_pengguna]);
                // console.log(dataFromDb[0]);
                
                const isMatch = await bcrypt.compare(password, dataFromDb[0].password);

                if (!isMatch) {
                    return res.status(401).json({ error: 'Password salah.' });
                }

                // Membuat token JWT untuk Mahasiswa
                const token = jwt.sign(
                    { id_pengguna: user.id_pengguna, id_pendaftaran: user.id ,nim: user.nim, namaLengkap: user.namaLengkap, role: dataFromDb[0].role },
                    JWT_SECRET,
                    { expiresIn: '3h' }
                );
                return res.json({ message: 'Login berhasil d', token , role: dataFromDb[0].role});
            }

            // Jika tidak ditemukan di tabel pendaftaran, coba login sebagai Admin/Juri di tabel pengguna
            const queryAdminJuri = 'SELECT * FROM pengguna WHERE username = ?';
            db.query(queryAdminJuri, [credential], async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Gagal memproses login.' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ error: 'NIM atau Username tidak ditemukan.' });
                }

                const user = results[0];

                if (user.role.toLowerCase() !== 'admin' && user.role.toLowerCase() !== 'juri') {
                    return res.status(401).json({ error: 'NIM atau Username tidak ditemukan.' });
                }
                
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(401).json({ error: 'Password salah.' });
                }

                // Membuat token JWT untuk Admin atau Juri
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    JWT_SECRET,
                    { expiresIn: '3h' }
                );
                return res.json({ message: 'Login berhasil', token, role: user.role });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

module.exports = router;
