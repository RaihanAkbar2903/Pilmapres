const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM nilai", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(results);
  });
});

module.exports = router;