import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
  Dialog,
  Menu,
  TextField,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import WebIcon from "@mui/icons-material/Web";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "./assets/images/logopilmapres.png";
import { useNavigate } from "react-router-dom";
import PdfViewer from "./PdfViewer";

function BerkasAdminCU() {
  const [openLaman, setOpenLaman] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState({});
  const [berkas, setBerkas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBerkas, setFilteredBerkas] = useState([]);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState("");
  const navigate = useNavigate();

  const handleOpenPdfDialog = (fileName) => {
    setPdfFileUrl(`http://localhost:5000/uploads/${fileName}`); // Sesuaikan path ke file PDF Anda
    setOpenPdfDialog(true);
  };

  const handleClosePdfDialog = () => {
    setOpenPdfDialog(false);
    setPdfFileUrl("");
  };

  useEffect(() => {
    fetchBerkas();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredBerkas(berkas);
      return;
    }
    setFilteredBerkas(
      berkas.filter((berkas) =>
        berkas.namaLengkap.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, berkas]);

  const fetchBerkas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/capaian", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Data berkas:", data);

      setBerkas(data);
    } catch (err) {
      console.error("Gagal mengambil data berkas:", err);
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
      // Panggil endpoint logout (opsional)
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Hapus token dari localStorage
      localStorage.removeItem("token");

      // Redirect ke halaman login
      navigate("/landingpage");
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };
  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setDataDialog({ id });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDataDialog({});
  };

  const handleSetuju = async () => {
    try {
      const id = dataDialog.id;

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/capaian/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "disetujui" }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error("Gagal menyetujui capaian:", data.error);
        return;
      }
      handleCloseDialog();
      fetchBerkas();
    } catch (err) {
      console.error("Gagal menyetujui capaian:", err);
    }
  };

  const handleTolak = async () => {
    try {
      const id = dataDialog.id;
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/capaian/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "ditolak" }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error("Gagal menyetujui capaian:", data.error);
        return;
      }
      handleCloseDialog();
      fetchBerkas();
    } catch (err) {
      console.error("Gagal menolak capaian:", err);
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
            Data Berkas
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

        <Grid
          container
          spacing={3}
          justifyContent="flex-end"
          sx={{ padding: 3 }}
        >
          <Grid item xs={12}>
            <Paper sx={{ padding: 1, backgroundColor: "#FFFFFF" }}>
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
                Berkas Capaian Unggulan
              </Typography>
              <TableContainer component={Paper}>
                <TextField
                  id="search"
                  label="Cari nama peserta"
                  variant="outlined"
                  margin="normal"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#003366" }}>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        No
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Nama Peserta
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Nama Berkas
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Kategori
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Wujud Capaian
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Bidang
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Aksi
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(filteredBerkas || berkas)?.map((berkas, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#E8F0FE" : "#ffffff",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{berkas.namaLengkap}</TableCell>
                        <TableCell>{berkas.nama_berkas}</TableCell>
                        <TableCell>{berkas.kategori}</TableCell>
                        <TableCell>{berkas.wujud_capaian}</TableCell>
                        <TableCell>{berkas.bidang}</TableCell>
                        <TableCell>
                          {berkas.status === "disetujui" && (
                            <Typography sx={{ color: "green" }}>
                              {berkas.status}
                            </Typography>
                          )}
                          {berkas.status === "menunggu" && (
                            <Typography sx={{ color: "orange" }}>
                              {berkas.status}
                            </Typography>
                          )}
                          {berkas.status === "ditolak" && (
                            <Typography sx={{ color: "red" }}>
                              {berkas.status}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0}>
                            <IconButton
                              onClick={() =>
                                handleOpenPdfDialog(berkas.nama_berkas)
                              }
                            >
                              <InfoIcon sx={{ color: "#003366" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleOpenDialog(berkas.id);
                              }}
                            >
                              <CheckCircleIcon sx={{ color: "green" }} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                maxWidth="lg"
                fullWidth
              >
                <DialogTitle>View PDF</DialogTitle>
                <DialogContent>
                  <PdfViewer fileUrl={pdfFileUrl} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePdfDialog}>Close</Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                sx={{
                  "& .MuiDialog-paper": {
                    backgroundColor: "#003366",
                    borderRadius: "8px",
                    color: "white",
                    width: "100%",
                  },
                }}
              >
                <DialogTitle>Verifikasi Capaian</DialogTitle>
                <DialogContent>
                  <Typography>
                    Apakah anda yakin ingin menyetujui capaian unggulan ini ?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleSetuju();
                    }}
                    sx={{
                      backgroundColor: "#0DBD2E",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                    }}
                  >
                    Setuju
                  </Button>
                  <Button
                    onClick={() => {
                      handleTolak();
                    }}
                    sx={{
                      backgroundColor: "#FE651F",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                    }}
                  >
                    Tolak
                  </Button>
                  <Button
                    onClick={handleCloseDialog}
                    sx={{
                      backgroundColor: "gray",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                    }}
                  >
                    Batal
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BerkasAdminCU;
