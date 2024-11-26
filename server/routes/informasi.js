const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM informasi ORDER BY id DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

router.post("/", async (req, res) => {
  const { konten } = req.body;

  if (!konten) {
    return res.status(400).json({ error: "Konten harus di isi!" });
  }

  const cekInformasi = await db.promise().query("SELECT * FROM informasi ORDER BY id DESC LIMIT 1");
  
  if (!cekInformasi[0][0]) {
    const query = "INSERT INTO informasi (konten) VALUES (?)";
    db.query(query, [konten], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Informasi berhasil ditambahkan", result });
    });
  } else {
    const query = "UPDATE informasi SET konten = ? WHERE id = ?";
    db.query(query, [konten, cekInformasi[0][0].id], (err) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Informasi berhasil diubah" });
    });
  }
});

module.exports = router;