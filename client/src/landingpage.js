import React, { useRef } from 'react';
import { AppBar, Toolbar, Button, Box, Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Logo from './assets/images/logopilmapres.png';
import Banner from './assets/images/bannnerpilmapres.jpeg';

function Landing() {
  const navigate = useNavigate();

  // Referensi untuk scroll ke setiap section
  const informasiRef = useRef(null);
  const jadwalRef = useRef(null);
  const kontakRef = useRef(null);

  // Fungsi untuk scroll ke bagian tertentu
  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 50, // Mengurangi nilai untuk memastikan bagian terlihat jelas
      behavior: 'smooth', // Membuat scroll smooth
    });
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };
  const handleRegistrasiClick = () => {
    navigate('/Registrasi');
  };


  // Data Jadwal 
  const jadwal = [
    { tanggal: 'Februari', acara: 'Sosialisasi Pedoman Pilmapres di LLDIKTI' },
    { tanggal: '17 April', acara: 'Batas Akhir Pendaftaran Mapres Perguruan Tinggi ke LLDIKTI' },
    { tanggal: '19 April', acara: 'Pengiriman data jumlah peserta masing-masing LLDIKTI ke BPTI melalui alamat email bpti@kemdikbud.go.id' },
    { tanggal: '1 - 10 Mei', acara: 'Pembuatan akun operator LLDikti' },
    { tanggal: '2 - 10 Mei', acara: 'Seleksi Wilayah Mapres di LLDikti' },
    { tanggal: '12 - 15 Mei', acara: 'Laporan LLDikti ke BPTI Terkait hasil seleksi Mapres' },
    { tanggal: '17 Mei', acara: 'Pengumuman daftar peserta yang berhak mengikuti Seleksi Awal Nasional oleh BPTI' },
    { tanggal: '20 - 24 Mei', acara: 'Peserta Seleksi Awal Nasional Mengunggah berkas yang dipersyaratkan' },
    { tanggal: '27 Mei - 24 Juni', acara: 'Seleksi Awal Nasional Mapres' },
    { tanggal: '28 Juni 2024', acara: 'Pengumuman daftar peserta yang berhak mengikuti Seleksi Final Nasional oleh BPTI' },
    { tanggal: '20 - 24 Juli', acara: 'Peserta Seleksi Awal Nasional Mengunggah berkas yang dipersyaratkan' },
    { tanggal: '24 - 28 Juli', acara: 'Pelaksanaan Seleksi Final Nasional' },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" style={{ backgroundColor: '#F5F5F5', minHeight: '56px' }}>
        <Container maxWidth="lg">
          <Toolbar style={{ minHeight: '56px', padding: 0 }}>
            <img
              src={Logo}
              alt="Logo Pilmapres"
              style={{ width: '100px', marginRight: '20px' }}
            />

            {/* Tombol Navigasi di Tengah */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', color: '#1E376D' }}>
              <Button color="inherit" style={{ padding: '6px 16px' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Beranda</Button>
              <Button color="inherit" style={{ padding: '6px 16px' }} onClick={() => scrollToSection(informasiRef)}>Informasi</Button>
              <Button color="inherit" style={{ padding: '6px 16px' }} onClick={() => scrollToSection(jadwalRef)}>Jadwal</Button>
              <Button color="inherit" style={{ padding: '6px 16px' }} onClick={() => scrollToSection(kontakRef)}>Kontak</Button>
            </Box>

            {/* Tombol Masuk di Sebelah Kanan */}
            <Button
              color="inherit"
              variant="outlined"
              style={{ backgroundColor: '#1E376D', color: '#FFFFFF', padding: '6px 16px' }}
              onClick={handleLoginClick}
            >
              Masuk
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              style={{ backgroundColor: '#1E376D', color: '#FFFFFF', padding: '6px 18px', marginLeft: '10px' }}
              onClick={handleRegistrasiClick}
            >
              Daftar
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Section */}
      <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
        <Grid container spacing={3}>
          {/* Banner Section */}
          <Grid item xs={12}>
            <Paper>
              <img
                src={Banner}
                alt="Banner Pilmapres"
                style={{ width: '100%', height: 'auto' }}
              />
            </Paper>
          </Grid>

          {/* Informasi Section */}
          <Grid item xs={12} ref={informasiRef}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '10px', color: '#003366' }}>
                INFORMASI
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                  <img
                    src={Logo}
                    alt="Logo Pilmapres"
                    style={{ width: '120px', height: '120px', marginBottom: '20px' }}
                  />
                </Box>

                <Typography variant="body1" component="p">
                  Pilmapres atau Pemilihan Mahasiswa Berprestasi merupakan kompetisi mahasiswa yang
                  diselenggarakan oleh Pusat Prestasi Nasional yang ada di bawah naungan Kementerian Riset,
                  Teknologi, dan Pendidikan Tinggi setiap tahunnya. Tujuannya adalah untuk memberikan apresiasi
                  kepada mahasiswa terbaik yang siap menjadi agen perubahan untuk membangun Indonesia yang lebih
                  baik. Dengan fokus program Sarjana dan Diploma.
                </Typography>
              </Box>

              <Typography
                variant="h5"
                style={{ marginTop: '20px', color: '#e74c3c', fontWeight: 'bold' }}
              >
                Tujuan
              </Typography>
              <Typography variant="body1" component="p" style={{ marginLeft: '20px', marginBottom: '10px' }}>
                1. Menguatnya kesadaran pengelola kampus untuk memfasilitasi kreativitas mahasiswa melalui kegiatan
                intrakurikuler, kokurikuler, dan ekstrakurikuler.
                <br />
                2. Meningkatnya kesadaran kampus dalam memberikan penghargaan kepada mahasiswa berprestasi.
                <br />
                3. Meningkatnya jumlah gagasan kreatif mahasiswa untuk pembangunan yang berasal dari kampus.
              </Typography>

              <Typography
                variant="h5"
                style={{ marginTop: '10px', color: '#e74c3c', fontWeight: 'bold' }}
              >
                Sasaran
              </Typography>
              <Typography variant="body1" component="p" style={{ marginLeft: '20px' }}>
                1. Terselenggaranya kegiatan untuk mengases dan menetapkan peraih gelar mahasiswa berprestasi.
                <br />
                2. Meningkatnya jumlah peserta Pilmapres.
              </Typography>
            </Paper>
          </Grid>

          {/* Jadwal Section */}
          <Grid item xs={12} ref={jadwalRef}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '10px', color: '#003366' }}>
                JADWAL
              </Typography>

              {/* Tabel Jadwal */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: '#003366', fontWeight: 'bold' }}>Tanggal</TableCell>
                      <TableCell style={{ color: '#003366', fontWeight: 'bold' }}>Acara</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jadwal.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ color: '#e74c3c', fontWeight: 'bold' }}>{row.tanggal}</TableCell>
                        <TableCell>{row.acara}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box ref={kontakRef} sx={{ backgroundColor: '#f3f3f3', color: '#003366', padding: '20px', marginTop: '20px' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            {/* Logo Pilmapres */}
            <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
              <img
              src={Logo}
              alt="Logo Pilmapres"
              style={{ width: '120px', height: '120px' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              />
            </Grid>

            {/* Alamat dan Kontak */}
            <Grid item xs={12} sm={9} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              {/* Bagian Alamat */}
              <Typography variant="body2">
                Jl. Ahmad Yani Batam Kota, Kota Batam, Kepulauan Riau, Indonesia
              </Typography>

              {/* Bagian Kontak: Email, Helpdesk, dan Phone */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2">Email: info@polibatam.ac.id</Typography>
                <Typography variant="body2">Helpdesk: helpdesk01740@polibatam.ac.id</Typography>
                <Typography variant="body2">Phone: +62-778-469858 Ext:017</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
