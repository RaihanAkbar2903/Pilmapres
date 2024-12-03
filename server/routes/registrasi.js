const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  const {
    username,
    namaLengkap,
    nim,
    password,
    tempat,
    tanggalLahir,
    jenisKelamin,
    noHp,
    email,
    jurusan,
    prodi,
    programPendidikan,
  } = req.body;

  const foto = req.files?.foto;

  // Validasi input
  if (
    !username ||
    !namaLengkap ||
    !nim ||
    !password ||
    !email ||
    !jurusan ||
    !prodi ||
    !programPendidikan ||
    !foto
  ) {
    return res.status(400).json({ error: "Data registrasi tidak lengkap" });
  }

  if (foto.mimetype !== "image/jpeg" && foto.mimetype !== "image/png") {
    return res.status(400).json({ error: "File harus berformat JPG atau PNG" });
  }

  try {
    // Cek apakah data sudah ada
    const checkQuery =
      "SELECT * FROM pendaftaran WHERE nim = ? OR email = ? OR noHp = ? OR namaLengkap = ?";
    const [results] = await db.promise().query(checkQuery, [
      nim,
      email,
      noHp,
      namaLengkap,
    ]);

    if (results.length > 0) {
      const duplicateFields = [];
      if (results.some((row) => row.nim === nim)) duplicateFields.push("NIM");
      if (results.some((row) => row.email === email)) duplicateFields.push("EMAIL");
      if (results.some((row) => row.noHp === noHp)) duplicateFields.push("NO. HP");
      if (results.some((row) => row.namaLengkap === namaLengkap))
        duplicateFields.push("Nama Lengkap");

      return res.status(409).json({
        error: `Registrasi Gagal. ${duplicateFields.join(", ")} sudah terdaftar.`,
      });
    }

    // Cek apakah username sudah ada
    const [usernameResults] = await db
      .promise()
      .query("SELECT * FROM pengguna WHERE username = ?", [username]);
    if (usernameResults.length > 0) {
      return res.status(409).json({ error: "Username sudah terdaftar" });
    }

    // Generate nama unik untuk foto
    const fotoName = `${crypto.randomBytes(16).toString("hex")}${path.extname(
      foto.name
    )}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tambahkan ke tabel pengguna
    const queryPengguna =
      "INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)";
    const [result] = await db
      .promise()
      .query(queryPengguna, [username, hashedPassword, "mahasiswa"]);
    const id_pengguna = result.insertId;

    // Tambahkan ke tabel pendaftaran
    const insertQuery = `
      INSERT INTO pendaftaran
      (namaLengkap, nim, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto, id_pengguna)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.promise().query(insertQuery, [
      namaLengkap,
      nim,
      tempat,
      tanggalLahir,
      jenisKelamin,
      noHp,
      email,
      jurusan,
      prodi,
      programPendidikan,
      fotoName,
      id_pengguna,
    ]);

    // Simpan foto ke folder uploads/foto
    const uploadPath = path.join(__dirname, "..", "uploads", "foto", fotoName);
    foto.mv(uploadPath, (err) => {
      if (err) {
        console.error("Error saat menyimpan foto:", err);
        return res.status(500).json({ error: "Gagal menyimpan foto" });
      }
    });

    res.status(201).json({ message: "Pendaftaran berhasil ditambahkan" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
