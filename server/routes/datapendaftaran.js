const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM pendaftaran";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
