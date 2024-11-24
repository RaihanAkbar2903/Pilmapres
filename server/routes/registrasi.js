// server/routes/registrasi.js
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db"); // Mengimpor koneksi database dari db.js
const router = express.Router();

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
    foto,
  } = req.body;

  if (
    !username ||
    !namaLengkap ||
    !nim ||
    !password ||
    !email ||
    !jurusan ||
    !prodi ||
    !programPendidikan
  ) {
    return res.status(400).json({ error: "Data registrasi tidak lengkap." });
  }

  try {
    const checkQuery = `SELECT * FROM pendaftaran WHERE nim = ? OR email = ? OR noHp = ? OR namaLengkap = ?`;
    const [results] = await db
      .promise()
      .query(checkQuery, [nim, email, noHp, namaLengkap]);

    if (results.length > 0) {
      const duplicateFields = [];
      if (results.some((row) => row.nim === nim)) duplicateFields.push("NIM");
      if (results.some((row) => row.email === email))
        duplicateFields.push("email");
      if (results.some((row) => row.noHp === noHp))
        duplicateFields.push("No. HP");
      if (results.some((row) => row.namaLengkap === namaLengkap))
        duplicateFields.push("Nama Lengkap");

      return res.status(409).json({
        error: `Registrasi gagal. ${duplicateFields.join(
          ", "
        )} sudah terdaftar.`,
      });
    }

    const [usernameResults] = await db
      .promise()
      .query("SELECT * FROM pengguna WHERE username = ?", [username]);
    if (usernameResults.length > 0) {
      return res.status(409).json({ error: "Username sudah terdaftar." });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tambahkan pengguna terlebih dahulu
    const queryPengguna =
      "INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)";
    const [result] = await db
      .promise()
      .query(queryPengguna, [username, hashedPassword, "mahasiswa"]);
    const id_pengguna = result.insertId;

    // Masukkan data ke tabel pendaftaran
    const insertQuery = `
            INSERT INTO pendaftaran 
            (namaLengkap, nim, tempat, tanggalLahir, jenisKelamin, noHp, email, jurusan, prodi, programPendidikan, foto, id_pengguna) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    await db
      .promise()
      .query(insertQuery, [
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
        foto,
        id_pengguna,
      ]);

    res.status(201).json({ message: "Pendaftaran berhasil ditambahkan" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

module.exports = router;
