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
        "SELECT j.id, namaLengkap, nim , prodi FROM jadwal_presentasi as j JOIN pendaftaran ON j.id_pendaftaran = pendaftaran.id ORDER BY nilai ASC";
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(results);
      });
    } else {
      const query =
        "SELECT j.id, namaLengkap, hari_tanggal , waktu, nilai, j.tempat FROM jadwal_presentasi as j JOIN pendaftaran ON j.id_pendaftaran = pendaftaran.id WHERE j.id_pendaftaran = ?";
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

router.get("/:id", async (req, res) => {
  const [jadwal] = await db.promise().query("SELECT * FROM jadwal_presentasi WHERE id = ?", [req.params.id]);

  if (!jadwal[0]) {
    return res.status(404).json({ error: "Jadwal tidak ditemukan" });
  }
  console.log(jadwal[0]);
  jadwal[0].nilai = JSON.parse(jadwal[0].nilai);
  return res.status(200).json(jadwal[0]);
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

router.post("/:id/nilai", async (req, res) => {
  const { id } = req.params;

  const { content, accuracy, fluency, pronounciation, overall_performance } =
    req.body;
  console.log(req.body);

  if (
    !content ||
    !accuracy ||
    !fluency ||
    !pronounciation ||
    !overall_performance
  ) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  const [dataFromDb] = await db
    .promise()
    .query("SELECT * FROM jadwal_presentasi WHERE id = ?", [id]);

  if (dataFromDb.length === 0) {
    return res.status(404).json({ error: "Data Jadwal Presentasi tidak ditemukan" });
  }

  const nilai = {
    content: {
      skor: content,
      skor_terbobot: content * 0.25,
    },
    accuracy: {
      skor: accuracy,
      skor_terbobot: accuracy * 0.25,
    },
    fluency: {
      skor: fluency,
      skor_terbobot: fluency * 0.2,
    },
    pronounciation: {
      skor: pronounciation,
      skor_terbobot: pronounciation * 0.2,
    },
    overall_performance: {
      skor: overall_performance,
      skor_terbobot: overall_performance * 0.1,
    },
    total:
      content * 0.25 +
      accuracy * 0.25 +
      fluency * 0.2 +
      pronounciation * 0.2 +
      overall_performance * 0.1,
  };

  const query = "UPDATE jadwal_presentasi SET nilai = ? WHERE id = ?";
  db.query(query, [JSON.stringify(nilai), id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Nilai berhasil ditambahkan" });
  });
});

module.exports = router;
