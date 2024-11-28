const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  var token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Token tidak ditemukan" });
  token = token.replace("Bearer ", "");

  jwt.verify(token, "mySuperSecretKey", (err, user) => {
    if (err) return res.status(403).json({ error: "Token tidak valid" });
    console.log(user);
   
    if (user.role == "Admin") {
      const query =
        "SELECT j.id, namaLengkap, hari_tanggal , waktu, j.tempat FROM jadwal_presentasi as j JOIN pendaftaran ON j.id_pendaftaran = pendaftaran.id";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results);
      });
    } else if (user.role == "Juri") {
      const query =
        "SELECT j.id, namaLengkap, nim , prodi FROM jadwal_presentasi as j JOIN pendaftaran ON j.id_pendaftaran = pendaftaran.id";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results);
      });
    } else {
      const query =
        "SELECT j.id, namaLengkap, hari_tanggal , waktu, j.tempat FROM jadwal_presentasi as j JOIN pendaftaran ON j.id_pendaftaran = pendaftaran.id WHERE j.id_pendaftaran = ?";
      db.query(query, [user.id_pendaftaran], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results[0]);
      });
    }
  });
});

router.get("/nama", (req, res) => {
  const query = "SELECT id, namaLengkap FROM pendaftaran";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(results);
  });
});

router.post("/", async (req, res) => {
  const { peserta, haritanggal, waktu, tempat } = req.body;

  if (!peserta || !haritanggal || !waktu || !tempat) {
    return res.status(400).json({ error: "Semua data harus diisi!" });
  }

  const [cekpeserta] = await db
    .promise()
    .query("SELECT * FROM jadwal_presentasi WHERE id_pendaftaran = ?", [peserta]);

  if (cekpeserta[0]) {
    return res
      .status(400)
      .json({ error: "Peserta sudah terdaftar di jadwal presensi" });
  }

  const query =
    "INSERT INTO jadwal_presentasi (id_pendaftaran, hari_tanggal, waktu, tempat) VALUES (?, ?, ?, ?)";
  db.query(query, [peserta, haritanggal, waktu, tempat], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(results);
  });
});

router.put("/:id", async (req, res) => {
  const [cekJadwal] = await db
    .promise()
    .query("SELECT * FROM jadwal_presentasi WHERE id = ?", [req.params.id]);

  if (!cekJadwal[0]) {
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }

  const { haritanggal, waktu, tempat } = req.body;

  if (!haritanggal || !waktu || !tempat) {
    return res.status(400).json({ error: "Semua data harus diisi!" });
  }

  const query =
    "UPDATE jadwal_presentasi SET hari_tanggal = ?, waktu = ?, tempat = ? WHERE id = ?";
  db.query(
    query,
    [haritanggal, waktu, tempat, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(200).json({ message: "Jadwal berhasil diubah" });
    }
  );
});

router.delete("/:id", async (req, res) => {
  const [cekJadwal] = await db
    .promise()
    .query("SELECT * FROM jadwal_presentasi WHERE id = ?", [req.params.id]);

  if (!cekJadwal[0]) {
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }

  const query = "DELETE FROM jadwal_presentasi WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Jadwal berhasil dihapus" });
  });
});

module.exports = router;
