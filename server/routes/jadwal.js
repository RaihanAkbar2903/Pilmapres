const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM jadwal ORDER BY tanggal_mulai ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(results);
  });
});

router.post("/", async (req, res) => {
  const { tanggal_mulai, tanggal_berakhir, acara } = req.body;

  if (!tanggal_mulai || !tanggal_berakhir || !acara) {
    return res.status(400).json({ error: "Semua data harus diisi!" });
  }

  const query =
    "INSERT INTO jadwal (tanggal_mulai, tanggal_berakhir, acara) VALUES (?, ?, ?)";
  db.query(query, [tanggal_mulai, tanggal_berakhir, acara], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Jadwal berhasil ditambahkan" });
  });
});

router.put("/:id", async (req, res) => {
  const [cekJadwal] = await db
    .promise()
    .query("SELECT * FROM jadwal WHERE id = ?", [req.params.id]);

  if (!cekJadwal[0]) {
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }

  const { tanggal_mulai, tanggal_berakhir, acara } = req.body;

  if (!tanggal_mulai || !tanggal_berakhir || !acara) {
    return res.status(400).json({ error: "Semua data harus diisi!" });
  }

  const query =
    "UPDATE jadwal SET tanggal_mulai = ?, tanggal_berakhir = ?, acara = ? WHERE id = ?";
  db.query(
    query,
    [tanggal_mulai, tanggal_berakhir, acara, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(200).json({ message: "Jadwal berhasil diubah" });
    }
  );

});

router.delete("/:id", async (req, res) => {
  const [cekJadwal] = await db
    .promise()
    .query("SELECT * FROM jadwal WHERE id = ?", [req.params.id]);

  if (!cekJadwal[0]) {
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }

  const query = "DELETE FROM jadwal WHERE id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Jadwal berhasil dihapus" });
  });
});
module.exports = router;
