const express = require("express");
const db = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require("crypto");

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

    if (user.role !== "Admin") {
      var id = user.id_pendaftaran;
      const query = "SELECT * FROM capaian WHERE id_pendaftaran = ?";
      db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results);
      });
    } else {
      // buat query untuk mengambil semua capaian yang relasinya dengan pendaftaran
      const query = "SELECT capaian.id, namaLengkap, nama_berkas, kategori, wujud_capaian, bidang, status FROM capaian INNER JOIN pendaftaran ON capaian.id_pendaftaran = pendaftaran.id";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        
        return res.status(200).json(results);
      });
    }
  });
});

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

    const query = "SELECT * FROM capaian WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) {
        return res.status(404).json({ error: "Capaian tidak ditemukan" });
      }
      return res.status(200).json(results[0]);
    });
  });
});

router.put("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status harus diisi" });
  }

  var token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, "mySuperSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ error: "Anda tidak memiliki akses" });
    }
    
    const query = "UPDATE capaian SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Status capaian berhasil diubah" });
    });
  });
});

router.post("/upload", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  jwt.verify(token.replace("Bearer ", ""), "mySuperSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    const { kategori, bidang, wujud } = req.body;
    const file = req.files.file;

    if (!kategori || !bidang || !wujud || !file) {
      return res.status(400).json({ error: "Semua data harus diisi!" });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "File harus berformat PDF" });
    }
    console.log(user);
    
    const id = user.id_pendaftaran;
    const randomName = crypto.randomBytes(9).toString("hex");
    const namaBerkas = `${randomName}-${file.name}`;
    const query =
      "INSERT INTO capaian (id_pendaftaran, kategori, bidang, wujud_capaian, nama_berkas) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [id, kategori, bidang, wujud, namaBerkas], (err) => {
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
          .json({ message: "Capaian berhasil ditambahkan" });
      });
    });
  });
});

module.exports = router;
