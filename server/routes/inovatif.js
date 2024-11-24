const express = require("express");
const db = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require("crypto");

// Endpoint GET: Mendapatkan semua data inovatif atau data spesifik berdasarkan user role
router.get("/", (req, res) => {
  var token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, "mySuperSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    if (user.role !== "Juri") {
      const id = user.id_pendaftaran;
      const query = "SELECT * FROM inovatif WHERE inovatif_pendaftaran = ?";
      db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results);
      });
    } else {
      const query = `
        SELECT 
          inovatif.id, 
          pendaftaran.namaLengkap, 
          inovatif.nama_berkas,
          pendaftaran.prodi 
        FROM inovatif 
        INNER JOIN pendaftaran ON inovatif.inovatif_pendaftaran = pendaftaran.id
      `;
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(results);
      });
    }
  });
});

// Endpoint GET by ID: Mendapatkan data inovatif berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  var token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, "mySuperSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    const query = "SELECT * FROM inovatif WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) {
        return res.status(404).json({ error: "Data inovatif tidak ditemukan" });
      }
      return res.status(200).json(results[0]);
    });
  });
});



// Endpoint POST: Mengunggah file inovatif
router.post("/upload", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  jwt.verify(token.replace("Bearer ", ""), "mySuperSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    const file = req.files.file;

    if (!file) {
      return res.status(400).json({ error: "File harus diunggah!" });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "File harus berformat PDF" });
    }

    const id = user.id_pendaftaran;
    const randomName = crypto.randomBytes(9).toString("hex");
    const namaBerkas = `${randomName}-${file.name}`;
    const query =
      "INSERT INTO inovatif (inovatif_pendaftaran, nama_berkas) VALUES (?, ?)";
    db.query(query, [id, namaBerkas], (err) => {
      if (err) return res.status(500).json({ error: err });

      const uploadPath = path.join(__dirname, "..", "uploads", namaBerkas);

      file.mv(uploadPath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "File upload failed", error: err });
        }

        return res
          .status(201)
          .json({ message: "Inovatif berhasil ditambahkan" });
      });
    });
  });
});

module.exports = router;
