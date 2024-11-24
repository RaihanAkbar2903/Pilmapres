const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
    const query = `
        INSERT INTO pengguna (username, password)
        SELECT nim, password
        FROM pendaftaran
        ON DUPLICATE KEY UPDATE password = VALUES(password);
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error during migration:', err);
            return res.status(500).json({ error: 'Gagal memigrasikan data.' });
        }

        res.status(201).json({ message: 'Data pendaftaran berhasil dimigrasikan ke pengguna.', results });
    });
});

module.exports = router;
