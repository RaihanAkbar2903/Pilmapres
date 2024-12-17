import React, { useState, useEffect } from "react";
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
  TextField,
  InputLabel,
  MenuItem,
  DialogActions,
  Dialog,
  Menu,
  Select,
  FormControl,
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
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "./assets/images/logopilmapres.png";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function JadwalPresentasi() {
  const [openLaman, setOpenLaman] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openTambah, setOpenTambah] = useState(false);
  const [newJadwal, setNewJadwal] = useState({
    peserta: "",
    haritanggal: "",
    tempat: "",
    waktu: "",
  });

  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [editedJadwal, setEditedJadwal] = useState({
    peserta: "",
    haritanggal: "",
    tempat: "",
    waktu: "",
  });
  const [jadwal, setJadwal] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleTambahClick = () => {
    setNewJadwal({
      peserta: "",
      haritanggal: "",
      tempat: "",
      waktu: "",
    });
    setOpenTambah(true);
  };

  useEffect(() => {
    fetchJadwal();
    fetchNama();
  }, []);

  const fetchJadwal = async () => {
    try {
      const response = await fetch("http://localhost:5000/jadwalpresentasi", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJadwal(data); // Assuming response data is in JSON format
      } else {
        console.error("Failed to fetch jadwal, status:", response.status);
      }
    } catch (error) {
      console.error("There was an error fetching the jadwal!", error);
    }
  };

  const fetchNama = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/jadwalpresentasi/nama",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPeserta(data); // Assuming response data is in JSON format
      } else {
        console.error("Failed to fetch nama, status:", response.status);
      }
    } catch (error) {
      console.error("There was an error fetching the nama!", error);
    }
  };

  const handleSaveTambah = async () => {
    try {
      // Assuming you want to make an API call or handle async operations here
      const response = await fetch("http://localhost:5000/jadwalpresentasi", {
        method: "POST",
        body: JSON.stringify(newJadwal),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Jadwal Baru berhasil ditambahkan");
        fetchJadwal();
        setOpenTambah(false);
      } else if (response.status === 400) {
        alert("Peserta sudah terdaftar di jadwal presetasi!");
      } else {
        alert("Semua data harus diisi!");
        console.log("Error saat menambah jadwal");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChangeTambah = (e) => {
    const { name, value } = e.target;
    setNewJadwal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = (jadwal) => {
    setSelectedJadwal(jadwal);
    setEditedJadwal({
      id: jadwal.id,
      peserta: jadwal.namaLengkap,
      haritanggal: dayjs(jadwal.hari_tanggal).format("YYYY-MM-DD"),
      tempat: jadwal.tempat,
      waktu: jadwal.waktu,
    });

    console.log("jadwal", jadwal);
    console.log("selectedJadwal", selectedJadwal);
    console.log("editedJadwal", editedJadwal);

    setOpenEdit(true);
  };

  const handleDeleteClick = (jadwal) => {
    setSelectedJadwal(jadwal);
    setOpenDelete(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/jadwalpresentasi/${selectedJadwal.id}`,
        {
          method: "PUT",
          body: JSON.stringify(editedJadwal),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("PUT : ", response);

      if (response.ok) {
        console.log("Jadwal berhasil diperbarui");
        setSelectedJadwal(null);
        setEditedJadwal({
          haritanggal: "",
          tempat: "",
          waktu: "",
        });
        fetchJadwal();
        setOpenEdit(false);
      } else {
        console.log("Error saat mengupdate jadwal");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/jadwalpresentasi/${selectedJadwal.id}`,
        {
          method: "DELETE",
        }
      );
      console.log("DELETE : ", response);

      if (response.ok) {
        console.log("Jadwal berhasil dihapus");
        fetchJadwal();
        setOpenDelete(false);
      } else {
        console.log("Error saat menghapus jadwal");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJadwal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            Kelola Jadwal
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
                Jadwal Presentasi
              </Typography>
              <Button
                onClick={handleTambahClick}
                variant="contained"
                color="primary"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#003366",
                  minWidth: "20vh",
                }}
              >
                Tambah
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#1E376D" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#FFFFFF" }}>No</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>Peserta</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        Hari/Tanggal
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>Waktu</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>Tempat</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jadwal.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#E8F0FE" : "#ffffff",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.namaLengkap}</TableCell>
                        <TableCell>
                          {new Date(row.hari_tanggal).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{row.tempat}</TableCell>
                        <TableCell>{row.waktu}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#003366",
            borderRadius: "8px",
            color: "white",
            width: "100%",
          },
        }}
      >
        <DialogTitle>Edit Jadwal</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            type="text"
            fullWidth
            name="peserta"
            disabled
            value={editedJadwal.peserta}
            onChange={handleChange}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <InputLabel sx={{ color: "white" }}>Hari/Tanggal</InputLabel>
          {/* <TextField
            margin="dense"
            type="date"
            fullWidth
            name="haritanggal"
            value={editedJadwal.haritanggal}
            onChange={handleChange}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          /> */}
          <DatePicker
            value={dayjs(editedJadwal.haritanggal)}
            onChange={(newValue) => {
              setEditedJadwal((prevState) => ({
                ...prevState,
                haritanggal: dayjs(newValue).format("YYYY-MM-DD"),
              }));
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              width: "100%",
            }}
          />
          <InputLabel sx={{ color: "white" }}>Tempat</InputLabel>
          <TextField
            margin="dense"
            type="text"
            fullWidth
            name="tempat"
            value={editedJadwal.tempat}
            onChange={handleChange}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <InputLabel sx={{ color: "white" }}>Waktu</InputLabel>
          <TextField
            margin="dense"
            type="text"
            fullWidth
            name="waktu"
            value={editedJadwal.waktu}
            onChange={handleChange}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEdit(false)}
            sx={{
              backgroundColor: "#FE651F",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleSaveEdit}
            sx={{
              backgroundColor: "#0DBD2E",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#003366",
            borderRadius: "8px",
            color: "white",
            width: "100%",
          },
        }}
      >
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus Jadwal {selectedJadwal?.peserta}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{
              backgroundColor: "#0DBD2E",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#FE651F",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTambah}
        onClose={() => setOpenTambah(false)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#003366",
            borderRadius: "8px",
            color: "white",
            width: "100%",
          },
        }}
      >
        <DialogTitle>Tambah Jadwal</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="input-nama">Peserta</InputLabel>
            <Select
              labelId="input-nama"
              id="select-nama"
              value={newJadwal.peserta}
              name="peserta"
              label="Peserta"
              onChange={handleChangeTambah}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
            >
              {peserta?.map((row) => (
                <MenuItem value={row.id}>{row.namaLengkap}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel sx={{ color: "white" }}>Hari/Tanggal</InputLabel>
          <TextField
            margin="dense"
            type="date"
            fullWidth
            name="haritanggal"
            value={newJadwal.haritanggal}
            onChange={handleChangeTambah}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <InputLabel sx={{ color: "white" }}>Tempat</InputLabel>
          <TextField
            margin="dense"
            type="text"
            fullWidth
            name="tempat"
            value={newJadwal.tempat}
            onChange={handleChangeTambah}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <InputLabel sx={{ color: "white" }}>Waktu</InputLabel>
          <TextField
            margin="dense"
            type="time"
            fullWidth
            name="waktu"
            value={newJadwal.waktu}
            onChange={handleChangeTambah}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenTambah(false)}
            sx={{
              backgroundColor: "#FE651F",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleSaveTambah}
            sx={{
              backgroundColor: "#0DBD2E",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Tambah
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default JadwalPresentasi;
