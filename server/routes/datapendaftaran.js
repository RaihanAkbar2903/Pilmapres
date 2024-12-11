const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  jwt.verify(token.replace("Bearer ", ""), "mySuperSecretKey", (err, user) => {
    if (err) return res.status(403).json({ error: "Token tidak valid" });

    if (user.role == "Admin") {
      const query = "SELECT * FROM pendaftaran";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
      });
    } else if (user.role == "Juri") {
      const query = "SELECT * FROM pendaftaran";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
      });
    } else {
      const query = "SELECT * FROM pendaftaran WHERE id = ?";
      db.query(query, [user.id_pendaftaran], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
      });
    }
  });
});

router.get("/nilai", (req, res) => {
  const query =
    "SELECT pendaftaran.id AS id_pendaftaran, pendaftaran.namaLengkap, pendaftaran.nim, keterangan, JSON_OBJECT( 'id', inovatif.id, 'inovatif_pendaftaran', inovatif.inovatif_pendaftaran, 'nama_berkas', inovatif.nama_berkas, 'nilai', inovatif.nilai ) AS inovatif, jadwal_presentasi.nilai AS jadwal_presentasi FROM pendaftaran JOIN inovatif ON pendaftaran.id = inovatif.inovatif_pendaftaran JOIN jadwal_presentasi ON pendaftaran.id = jadwal_presentasi.id_pendaftaran WHERE jadwal_presentasi.nilai IS NOT NULL AND inovatif.nilai IS NOT NULL";
  // const query = "SELECT p.id, p.namaLengkap, p.nim, i.nilai AS nilai_inovatif, jp.nilai AS nilai_presentasi FROM pendaftaran p JOIN inovatif i ON p.id = i.inovatif_pendaftaran JOIN jadwal_presentasi jp ON p.id = jp.id_pendaftaran WHERE jp.nilai IS NOT NULL AND i.nilai IS NOT NULL";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/nilai/mahasiswa", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  jwt.verify(token.replace("Bearer ", ""), "mySuperSecretKey", (err, user) => {
    if (err) return res.status(403).json({ error: "Token tidak valid" });
    const id = user.id_pendaftaran;

        const query = "SELECT pendaftaran.id AS id_pendaftaran, pendaftaran.namaLengkap, pendaftaran.nim, keterangan, JSON_OBJECT( 'id', inovatif.id, 'inovatif_pendaftaran', inovatif.inovatif_pendaftaran, 'nama_berkas', inovatif.nama_berkas, 'nilai', inovatif.nilai ) AS inovatif, jadwal_presentasi.nilai AS jadwal_presentasi FROM pendaftaran LEFT JOIN inovatif ON inovatif.inovatif_pendaftaran = pendaftaran.id LEFT JOIN jadwal_presentasi ON jadwal_presentasi.id_pendaftaran = pendaftaran.id WHERE pendaftaran.id = ?;"
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ error: "Data not found" });

      results[0].inovatif = results[0].inovatif ? JSON.parse(results[0].inovatif) : null;
      results[0].inovatif.nilai = results[0].inovatif.nilai ? JSON.parse(results[0].inovatif.nilai) : null;
      results[0].jadwal_presentasi = results[0].jadwal_presentasi ? JSON.parse(results[0].jadwal_presentasi) : null;
      res.json(results[0]);
    });
  });
});

router.get("/nilai/:id", (req, res) => {
  const query = `SELECT pendaftaran.id AS id_pendaftaran, pendaftaran.namaLengkap, pendaftaran.nim, keterangan, JSON_OBJECT( 'id', inovatif.id, 'inovatif_pendaftaran', inovatif.inovatif_pendaftaran, 'nama_berkas', inovatif.nama_berkas, 'nilai', inovatif.nilai ) AS inovatif, jadwal_presentasi.nilai AS jadwal_presentasi FROM pendaftaran JOIN inovatif ON inovatif.inovatif_pendaftaran = pendaftaran.id JOIN jadwal_presentasi ON jadwal_presentasi.id_pendaftaran = pendaftaran.id WHERE pendaftaran.id = ${req.params.id} AND jadwal_presentasi.nilai IS NOT NULL AND inovatif.nilai IS NOT NULL`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ error: "Data not found" });

    results[0].inovatif = results[0].inovatif ? JSON.parse(results[0].inovatif) : null;
    results[0].inovatif.nilai = results[0].inovatif.nilai ? JSON.parse(results[0].inovatif.nilai) : null;
    results[0].jadwal_presentasi = results[0].jadwal_presentasi ? JSON.parse(results[0].jadwal_presentasi) : null;
    res.json(results[0]);
  });
});

router.put("/:id/keterangan", (req, res) => {
  const query = `UPDATE pendaftaran SET keterangan = '${req.body.keterangan}' WHERE id = ${req.params.id}`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Data updated" });
  });
});

module.exports = router;
