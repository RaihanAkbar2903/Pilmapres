import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Logo from './assets/images/logopilmapres.png';
import Banner from './assets/images/bannnerpilmapres.jpeg';
import dayjs from 'dayjs';

function Landing() {
  const navigate = useNavigate();

  const [dataInformasi, setDataInformasi] = useState("");
  const [dataJadwal, setDataJadwal] = useState("");
  const [dataBanner, setDataBanner] = useState({});
  const informasiRef = useRef(null);
  const jadwalRef = useRef(null);
  const kontakRef = useRef(null);

  useEffect(() => {
    fetchDataInformasi();
    fetchDataJadwal();
    fetchDataBanner();
    console.log(dataJadwal);
  }, []);

  const fetchDataBanner = async () => {
      try {
          const response = await fetch('http://localhost:5000/banner');
          const data = await response.json();
          setDataBanner(data);
      } catch (error) {
          console.error('Gagal mengambil data banner:', error);
      }
  };

  const fetchDataJadwal = async () => {
    try {
      const response = await fetch("http://localhost:5000/jadwal");
      const data = await response.json();
      setDataJadwal(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataInformasi = async () => {
    try {
      const response = await fetch("http://localhost:5000/informasi");
      const data = await response.json();
      setDataInformasi(data.konten);
      console.log(data.konten);
      
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 50, 
      behavior: 'smooth', 
    });
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };
  const handleRegistrasiClick = () => {
    navigate('/Registrasi');
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#F5F5F5", minHeight: "56px" }}
      >
        <Container maxWidth="lg">
          <Toolbar style={{ minHeight: "56px", padding: 0 }}>
            <img
              src={Logo}
              alt="Logo Pilmapres"
              style={{ width: "100px", marginRight: "20px" }}
            />

            {/* Tombol Navigasi di Tengah */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                color: "#1E376D",
              }}
            >
              <Button
                color="inherit"
                style={{ padding: "6px 16px" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Beranda
              </Button>
              <Button
                color="inherit"
                style={{ padding: "6px 16px" }}
                onClick={() => scrollToSection(informasiRef)}
              >
                Informasi
              </Button>
              <Button
                color="inherit"
                style={{ padding: "6px 16px" }}
                onClick={() => scrollToSection(jadwalRef)}
              >
                Jadwal
              </Button>
              <Button
                color="inherit"
                style={{ padding: "6px 16px" }}
                onClick={() => scrollToSection(kontakRef)}
              >
                Kontak
              </Button>
            </Box>

            {/* Tombol Masuk di Sebelah Kanan */}
            <Button
              color="inherit"
              variant="outlined"
              style={{
                backgroundColor: "#1E376D",
                color: "#FFFFFF",
                padding: "6px 16px",
              }}
              onClick={handleLoginClick}
            >
              Masuk
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              style={{
                backgroundColor: "#1E376D",
                color: "#FFFFFF",
                padding: "6px 18px",
                marginLeft: "10px",
              }}
              onClick={handleRegistrasiClick}
            >
              Daftar
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Section */}
      <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
        <Grid container spacing={3}>
          {/* Banner Section */}
          <Grid item xs={12}>
            <Paper>
              <img
                src={`http://localhost:5000/uploads/${dataBanner?.image}`}
                alt="Banner Pilmapres"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>

          {/* Informasi Section */}
          <Grid item xs={12} ref={informasiRef}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography
                variant="h5"
                style={{ marginBottom: "10px", color: "#003366" }}
              >
                INFORMASI
              </Typography>

              {dataInformasi && (
                // <Typography variant="body1" component="p">
                <div dangerouslySetInnerHTML={{ __html: dataInformasi }} />
                // {/* </Typography> */}
              )}
            </Paper>
          </Grid>

          {/* Jadwal Section */}
          <Grid item xs={12} ref={jadwalRef}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography
                variant="h5"
                style={{ marginBottom: "10px", color: "#003366" }}
              >
                JADWAL
              </Typography>

              {/* Tabel Jadwal */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ color: "#003366", fontWeight: "bold" }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        style={{ color: "#003366", fontWeight: "bold" }}
                      >
                        Acara
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataJadwal &&
                      dataJadwal.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            style={{ color: "#e74c3c", fontWeight: "bold" }}
                          >
                            {row.tanggal_berakhir
                              ? dayjs(row.tanggal_mulai).format("D MMM") +
                                " - " +
                                dayjs(row.tanggal_berakhir).format("D MMM")
                              : dayjs(row.tanggal_mulai).format("D MMM")}
                          </TableCell>
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
      <Box
        ref={kontakRef}
        sx={{
          backgroundColor: "#f3f3f3",
          color: "#003366",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            {/* Logo Pilmapres */}
            <Grid
              item
              xs={12}
              sm={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={Logo}
                alt="Logo Pilmapres"
                style={{ width: "120px", height: "120px" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </Grid>

            {/* Alamat dan Kontak */}
            <Grid
              item
              xs={12}
              sm={9}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Bagian Alamat */}
              <Typography variant="body2">
                Jl. Ahmad Yani Batam Kota, Kota Batam, Kepulauan Riau, Indonesia
              </Typography>

              {/* Bagian Kontak: Email, Helpdesk, dan Phone */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2">
                  Email: info@polibatam.ac.id
                </Typography>
                <Typography variant="body2">
                  Helpdesk: helpdesk01740@polibatam.ac.id
                </Typography>
                <Typography variant="body2">
                  Phone: +62-778-469858 Ext:017
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
