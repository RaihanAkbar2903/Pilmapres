import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { default as ExpandMore, default as ExpandMoreIcon } from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import PeopleIcon from "@mui/icons-material/People";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import WebIcon from "@mui/icons-material/Web";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "./assets/images/logopilmapres.png";

function NilaiAdminDetail() {
  const [openLaman, setOpenLaman] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [berkas, setBerkas] = useState(null);
  const navigate = useNavigate();
  let {id} = useParams();

  useEffect(() => {
    fetchBerkas();
    console.log("Params:", id);
  }, []);

  const fetchBerkas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/datapendaftaran/nilai/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Gagal mengambil data berkas");
      }
      const data = await response.json();
      setBerkas(data);
    } catch (err) {
      console.error("Gagal mengambil data berkas:", err);
    }
  };

  const handleButtonLolos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/datapendaftaran/${id}/keterangan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keterangan: "lolos" }),
      });
      if (!response.ok) {
        throw new Error("Gagal mengubah status berkas");
      }
      navigate("/nilaiadmin");
    } catch (err) {
      console.error("Gagal mengubah status berkas:", err);
    }
  };

  const handleButtonTidakLolos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/datapendaftaran/${id}/keterangan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keterangan: "tidak lolos" }),
      });
      if (!response.ok) {
        throw new Error("Gagal mengubah status berkas");
      }
      navigate("/nilaiadmin");
    } catch (err) {
      console.error("Gagal mengubah status berkas:", err);
    }
  };

  const handleToggleLaman = () => {
    setOpenLaman(!openLaman);
  };

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#FFFFFF",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "2px solid #E0E0E0",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <Box>
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <img src={Logo} alt="Logo Pilmapres" style={{ width: "120px" }} />
          </Box>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={() => navigate("/dashboardadmin")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Beranda"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={() => navigate("/datapengguna")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Pengguna"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={() => navigate("/berkasadmincu")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Berkas"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={() => navigate("/jadwalpresentasi")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <PresentToAllIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Presentasi"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={() => navigate("/nilaiadmin")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <MilitaryTechRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Nilai"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
            <ListItem sx={{ marginBottom: "10px" }}>
              <Button
                fullWidth
                onClick={handleToggleLaman}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Laman"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
                {openLaman ? (
                  <ExpandLess sx={{ color: "#1E376D" }} />
                ) : (
                  <ExpandMore sx={{ color: "#1E376D" }} />
                )}
              </Button>
            </ListItem>
            <Collapse in={openLaman} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4, marginBottom: "10px" }}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/banner")}
                    sx={{
                      color: "#1E376D",
                      "&:hover": {
                        backgroundColor: "#E0E0E0",
                        color: "#003366",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1E376D" }}>
                      <ImageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Banner"
                      primaryTypographyProps={{ style: { color: "#1E376D" } }}
                    />
                  </Button>
                </ListItem>
                <ListItem sx={{ pl: 4, marginBottom: "10px" }}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/informasi")}
                    sx={{
                      color: "#1E376D",
                      "&:hover": {
                        backgroundColor: "#E0E0E0",
                        color: "#003366",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1E376D" }}>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Informasi"
                      primaryTypographyProps={{ style: { color: "#1E376D" } }}
                    />
                  </Button>
                </ListItem>
                <ListItem sx={{ pl: 4, marginBottom: "10px" }}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/jadwalpilmapres")}
                    sx={{
                      color: "#1E376D",
                      "&:hover": {
                        backgroundColor: "#E0E0E0",
                        color: "#003366",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1E376D" }}>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Jadwal"
                      primaryTypographyProps={{ style: { color: "#1E376D" } }}
                    />
                  </Button>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: "#003366",
            borderRadius: 0,
          }}
        >
          <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
            Nilai Peserta
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleAccountClick}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#E0E0E0", color: "#003366" },
              "& svg": { fontSize: 36 },
              position: "absolute",
              top: 10,
              right: 30,
            }}
          >
            <ExitToAppIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseAccountMenu}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Paper>
        
        {berkas ? (
        <Grid
          container
          spacing={3}
          justifyContent="flex-end"
          sx={{ padding: 3 }}
        >
          <Grid item xs={12}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1E376D",
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                Nilai Peserta
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1E376D",
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                {`${berkas.namaLengkap} - ${berkas.nim}`}
              </Typography>
              <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "semibold",
                      color: "black",
                      textAlign: "left",
                      marginBottom: 1,
                    }}
                  >
                    Nilai Inovatif 
                </Typography>
              {berkas.inovatif ? (
              <Accordion defaultExpanded >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${berkas.inovatif.id}-content`}
                  id={`panel${berkas.inovatif.id}-content`}
                >
                  <Typography>{berkas.inovatif.nama_berkas}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#1E376D",
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    Nilai: {parseFloat(berkas?.inovatif?.nilai?.total).toFixed(2)}
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid item xs={6} >
                      <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 5 }}>PENYAJIAN</Typography><br></br>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Penggunaan Bahasa Indonesia yang Baik dan Benar</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.penyajian1?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kesesuaian pengutipan dan acuan standar</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.penyajian2?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>SUBSTANSI PRODUK INOVATIF</Typography>< br></br>

                      <Typography variant='h10' sx={{ fontWeight: 'bold', color: '#1E376D'}}>MASALAH</Typography><br></br>
                      
                      <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Fakta atau gejala lingkungan yang menarik</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.masalah1?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Identifikasi masalah yang terdapat dalam fakta</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.masalah2?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Adanya uraian pihak terdampak</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.masalah3?.skor} slotProps={{input: {readOnly: true,},}}/>
                  </Grid>
                  <Grid item xs={6} >
                      <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 2 }}>SOLUSI</Typography><br></br>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.solusi1?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Rincian langkah-langkah untuk mencapai solusi</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.solusi2?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai kebutuhan sumber daya</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.solusi3?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.solusi4?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai solusi yang berciri SMART</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.solusi5?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>KUALITAS PRODUK INOVATIF</Typography><br></br>
                      
                      <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Keunikan Produk</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.kualitas1?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1  }}>Orisinalitas Produk</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} defaultValue={berkas.inovatif.nilai?.kualitas2?.skor} slotProps={{input: {readOnly: true,},}}/>

                      <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kelayakan Produk</Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 }   }}defaultValue={berkas.inovatif.nilai?.kualitas3?.skor} slotProps={{input: {readOnly: true,},}}/>
                  </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              ) : null}
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "semibold",
                  color: "black",
                  textAlign: "left",
                  marginTop: 3,
                  marginBottom: 1,
                }}
              >
                  Nilai Presentasi 
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                width: '100%',
                padding: 3, 
                marginTop: 2, 
                backgroundColor: '#FFFFFF' 
                }}
              >
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Nilai</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>{berkas.jadwal_presentasi?.total}</Typography>

                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Content</Typography>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={berkas.jadwal_presentasi?.content?.skor} slotProps={{input: {readOnly: true,},}}/>

                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Accuracy</Typography>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={berkas.jadwal_presentasi?.accuracy?.skor} slotProps={{input: {readOnly: true,},}}/>

                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Fluency</Typography>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={berkas.jadwal_presentasi?.fluency?.skor} slotProps={{input: {readOnly: true,},}}/>

                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Pronunciation</Typography>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={berkas.jadwal_presentasi?.pronounciation?.skor} slotProps={{input: {readOnly: true,},}}/>

                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Overall Performance</Typography>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={berkas.jadwal_presentasi?.overall_performance?.skor} slotProps={{input: {readOnly: true,},}}/>

              </Paper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "semibold",
                  color: "black",
                  textAlign: "left",
                  marginTop: 3,
                  marginBottom: 1,
                }}
              >
                  Nilai total: {parseFloat((berkas?.jadwal_presentasi?.total + berkas?.inovatif?.nilai?.total)/2).toFixed(2)}
              </Typography>
              <Stack spacing={2} direction="row" sx={{ marginTop: 3 }}>
                <Link href="/nilaiadmin" underline="none">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1E376D",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#003366",
                      },
                    }}
                  >
                    Kembali
                  </Button>
                </Link>
                <Button variant="contained" color="success" onClick={handleButtonLolos}>Lolos</Button>
                <Button variant="contained" color="error" onClick={handleButtonTidakLolos}>Tidak Lolos</Button>
              </Stack>
          </Grid>
        </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Tidak ada data nilai
            </Typography>
            <Link href="/nilaiadmin" underline="none">
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#1E376D",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#003366",
                  },
                }}
              >
                Kembali
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default NilaiAdminDetail;
