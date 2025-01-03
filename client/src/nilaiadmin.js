import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import PeopleIcon from "@mui/icons-material/People";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import WebIcon from "@mui/icons-material/Web";
import {
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/images/logopilmapres.png";

function NilaiAdmin() {
  const [openLaman, setOpenLaman] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [berkas, setBerkas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBerkas, setFilteredBerkas] = useState([]);
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nilaiTotal");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const calculateTotal = (berkas) => {
    if (typeof berkas === "undefined") {
      return 0;
    }

    return parseFloat(
      (berkas?.jadwal_presentasi?.total + berkas?.inovatif?.nilai?.total) / 2
    ).toFixed(2);
  };

  const fetchBerkas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/datapendaftaran/nilai", {
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
                Nilai Peserta
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
                    <TableRow
                      sx={{ backgroundColor: "#003366", color: "#FFFFFF" }}
                    >
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        No
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Nama Peserta
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Nim
                      </TableCell>
                      <TableCell
                        sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                        sortDirection={orderBy === "nilaiTotal" ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === "nilaiTotal"}
                          direction={orderBy === "nilaiTotal" ? order : "asc"}
                          onClick={() => handleRequestSort("nilaiTotal")}
                          sx={{ "&.Mui-active": { color: "#FFFFFF" },"&.Mui-active .MuiTableSortLabel-icon": { color: "#FFFFFF" }}}
                        >
                          Nilai Total
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sortDirection
                        sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                      >
                        Keterangan
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Aksi
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBerkas
                      .sort((a, b) => {
                        const totalA = calculateTotal(a);
                        const totalB = calculateTotal(b);
                        return order === "asc"
                          ? totalA - totalB
                          : totalB - totalA;
                      })
                      .map((row, index) => (
                        <TableRow key={row.id} sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#E8F0FE" : "#ffffff",
                        }}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.namaLengkap}</TableCell>
                          <TableCell>{row.nim}</TableCell>
                          <TableCell>{calculateTotal(row)}</TableCell>
                          <TableCell
                            sx={{
                              color:
                                row.keterangan === "menunggu"
                                  ? "orange"
                                  : row.keterangan === "lolos"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {row.keterangan === "menunggu"
                              ? "Menunggu"
                              : row.keterangan === "lolos"
                              ? "Lolos"
                              : "Tidak Lolos"}
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0}>
                              <IconButton
                                onClick={() => {
                                  navigate(`/nilaiadmin/${row.id_pendaftaran}`);
                                }}
                              >
                                <InfoIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    {/* {(filteredBerkas || berkas)?.map((berkas, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#E8F0FE" : "#ffffff",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{berkas.namaLengkap}</TableCell>
                        <TableCell>{berkas.nim}</TableCell>
                        <TableCell>
                          {parseFloat(
                            (berkas?.jadwal_presentasi?.total +
                              berkas?.inovatif?.nilai?.total) /
                              2
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              berkas.keterangan === "menunggu"
                                ? "orange"
                                : berkas.keterangan === "lolos"
                                ? "green"
                                : "red",
                          }}
                        >
                          {berkas.keterangan === "menunggu"
                            ? "Menunggu"
                            : berkas.keterangan === "lolos"
                            ? "Lolos"
                            : "Tidak Lolos"}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0}>
                            <IconButton
                              onClick={() => {
                                navigate(
                                  `/nilaiadmin/${berkas.id_pendaftaran}`
                                );
                              }}
                            >
                              <InfoIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NilaiAdmin;
