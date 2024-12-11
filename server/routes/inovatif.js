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
          pendaftaran.prodi,
          nilai 
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
      results[0].nilai = JSON.parse(results[0].nilai);
      console.log("detail nilai:   ",results[0]);
      return res.status(200).json(results[0]);
    });
  });
});

// Endpoint POST: Mengunggah file inovatif
router.post("/upload",async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  jwt.verify(token.replace("Bearer ", ""), "mySuperSecretKey", async (err, user) => {
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

    const [cekUploaded] = await db.promise().query("SELECT * FROM inovatif WHERE inovatif_pendaftaran = ?", [id]);

    if (cekUploaded.length > 0) return res.status(400).json({ error: "Anda sudah mengunggah file inovatif" });

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

router.post("/:id/nilai",async (req, res) => {
  const { id } = req.params;
  const { kualitas, masalah, penyajian, solusi } = req.body;

  if (!kualitas || !masalah || !penyajian || !solusi) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  // cek apakah request body berupa array
  if (!Array.isArray(kualitas) || !Array.isArray(masalah) || !Array.isArray(penyajian) || !Array.isArray(solusi)) {
    return res.status(400).json({ error: "Field harus berupa array" });
  }

  // cek apakah panjang array sama
  if (kualitas.length !== 3 || masalah.length !== 3 || penyajian.length !== 2 || solusi.length !== 5) {
    return res.status(400).json({ error: "Panjang array tidak valid" });
  }

  const [dataFromDb] = await db.promise().query("SELECT * FROM inovatif WHERE id = ?", [id]);
  console.log(dataFromDb);
  
  if (dataFromDb.length === 0) {
    return res.status(404).json({ error: "Data inovatif tidak ditemukan" });
  }
  
  const nilai = {
    penyajian1:{
      skor: penyajian[0],
      skor_terbobot: penyajian[0] * 0.10
    },
    penyajian2:{
      skor: penyajian[1],
      skor_terbobot: penyajian[1] * 0.05
    },
    masalah1:{
      skor: masalah[0],
      skor_terbobot: masalah[0] * 0.07
    },
    masalah2:{
      skor: masalah[1],
      skor_terbobot: masalah[1] * 0.08
    },
    masalah3:{
      skor: masalah[2],
      skor_terbobot: masalah[2] * 0.05
    },
    solusi1:{
      skor: solusi[0],
      skor_terbobot: solusi[0] * 0.05
    },
    solusi2:{
      skor: solusi[1],
      skor_terbobot: solusi[1] * 0.05
    },
    solusi3:{
      skor: solusi[2],
      skor_terbobot: solusi[2] * 0.05
    },
    solusi4:{
      skor: solusi[3],
      skor_terbobot: solusi[3] * 0.05
    },
    solusi5:{
      skor: solusi[4],
      skor_terbobot: solusi[4] * 0.15
    },
    kualitas1:{
      skor: kualitas[0],
      skor_terbobot: kualitas[0] * 0.10
    },
    kualitas2:{
      skor: kualitas[1],
      skor_terbobot: kualitas[1] * 0.10
    },
    kualitas3:{
      skor: kualitas[2],
      skor_terbobot: kualitas[2] * 0.10
    },
    total: (penyajian[0] * 1) + (penyajian[1] * 0.05) + (masalah[0] * 0.07) + (masalah[1] * 0.08) + (masalah[2] * 0.05) + (solusi[0] * 0.05) + (solusi[1] * 0.05) + (solusi[2] * 0.05) + (solusi[3] * 0.05) + (solusi[4] * 0.15) + (kualitas[0] * 0.10) + (kualitas[1] * 0.10) + (kualitas[2] * 0.10)
  }
  
  const query = "UPDATE inovatif SET nilai = ? WHERE id = ?";
  db.query(query, [JSON.stringify(nilai), id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Nilai berhasil ditambahkan" });
  });
});

module.exports = router;
