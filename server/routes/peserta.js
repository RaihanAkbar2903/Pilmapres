const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/:id_pengguna', async (req, res) => {
    const { id_pengguna } = req.params;
    console.log('Mengambil detail peserta untuk id_pengguna:', id_pengguna);

    try {
        const [rows] = await db.promise().query("SELECT * FROM pendaftaran where id = ?",[id_pengguna]);

        if (rows.length === 0) {
            console.log('Peserta tidak ditemukan'); // Debug log
            return res.status(404).json({ message: 'Peserta tidak ditemukan' });
        }

        console.log('Data peserta ditemukan:', rows[0]); // Debug log
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error saat mendapatkan detail peserta:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});

// Endpoint untuk mengambil semua data dari tabel pendaftaran
router.get('/', async (req, res) => {
    console.log('Mengambil semua data peserta');

     try {
        // const rows = await db.execute(
        //     `SELECT 
        //         id_pengguna,
        //         namaLengkap,
        //         nim,
        //         tempat AS tempatLahir,
        //         DATE_FORMAT(tanggalLahir, '%d-%m-%Y') AS tanggalLahir,
        //         jenisKelamin,
        //         noHp,
        //         email,
        //         jurusan,
        //         prodi,
        //         programPendidikan,
        //         foto
        //      FROM pendaftaran`
        // );
        const [rows] = await db.promise().query("SELECT * FROM pendaftaran");
        console.log(rows)
        if (!Array.isArray(rows) || rows.length === 0) {
            console.log('Tidak ada data peserta'); // Debug log
            return res.status(404).json({ message: 'Tidak ada data peserta' });
        }
        
        console.log('Data peserta berhasil diambil:', rows); // Debug log
        res.status(200).json(rows);
        
    } catch (error) {
        console.error('Error saat mendapatkan semua data peserta:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});


module.exports = router;
