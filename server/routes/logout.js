// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({ message: 'Logout berhasil' });
});

module.exports = router;