const express = require("express");
const db = require("../db");
const fs = require("fs");
const router = express.Router();
const crypto = require("crypto");
const path = require("path");

router.get("/", (req, res) => {
  db.query("SELECT * FROM banner LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(results[0]);
  });
});

router.post("/", async (req, res) => {
  // const { image } = req.files;
const image = req.files.image;
  console.log("REQ FILES",image);
  
  if (!image) {
    return res.status(400).json({ error: "Gambar harus diisi!" });
  }

  const cekBanner = await db
    .promise()
    .query("SELECT * FROM banner LIMIT 1");

    const namaRandom = crypto.randomBytes(10).toString("hex") + path.extname(image.name);
    console.log("NAMA RANDOM",namaRandom);
    
    const uploadPath = path.join(__dirname, "..", "uploads", namaRandom);

  if (!cekBanner[0][0]) {
    const query = "INSERT INTO banner (image) VALUES (?)";
    db.query(query, [namaRandom], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).json({ error: err });
      }
      );

      return res.json({ message: "banner berhasil ditambahkan", result });
    });
  } else {
    const query = "UPDATE banner SET image = ? WHERE id = ?";
    db.query(query, [namaRandom, cekBanner[0][0].id], (err) => {
      if (err) return res.status(500).json({ error: err });

      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).json({ error: err });
      }
      );

      const pathLama = path.join(__dirname, "..", "uploads", cekBanner[0][0].image);
      fs.unlink(pathLama, (err) => {
          if (err) return res.status(500).json({ error: err });
        }
      );
      return res.json({ message: "banner berhasil diubah" });
    });
  }
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
