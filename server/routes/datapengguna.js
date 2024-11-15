// routes/datapengguna.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();


router.get('/', (req, res) => {
    const query = 'SELECT * FROM pengguna';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results); 
    });
});


router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Data pengguna tidak lengkap' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role], (err) => {
        if (err) return res.status(500).json({ error: err });

        // Ambil data terbaru setelah insert
        db.query('SELECT * FROM pengguna', (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json(results); // Kirim data pengguna terbaru
        });
    });
});

router.put('/:id_pengguna', async (req, res) => {
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
        console.log(req.body);
    });
});

router.delete('/:id_pengguna', (req, res) => {
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

module.exports = router;
