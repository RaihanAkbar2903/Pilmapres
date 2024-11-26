import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StarIcon from "@mui/icons-material/Star";
import Logo from "./assets/images/logopilmapres.png";
import { useNavigate } from "react-router-dom";

function Jadwal() {
  const navigate = useNavigate();
  const [openBerkas, setOpenBerkas] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataJadwal, setDataJadwal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/jadwalpresensi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setDataJadwal(data);
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
      }
    };

    fetchData();
  }, []);

  const handleToggleBerkas = () => {
    setOpenBerkas(!openBerkas);
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
      navigate("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
            <ListItem
              sx={{
                marginBottom: "10px",
              }}
            >
              <Button
                fullWidth
                onClick={() => navigate("/dashboardmahasiswa")}
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
            <ListItem
              sx={{
                marginBottom: "10px",
              }}
            >
              <Button
                fullWidth
                onClick={handleToggleBerkas}
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
                {openBerkas ? (
                  <ExpandLess sx={{ color: "#1E376D" }} />
                ) : (
                  <ExpandMore sx={{ color: "#1E376D" }} />
                )}
              </Button>
            </ListItem>
            <Collapse in={openBerkas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  sx={{
                    pl: 4,
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => navigate("/berkascu")}
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
                      primary="CU"
                      primaryTypographyProps={{ style: { color: "#1E376D" } }}
                    />
                  </Button>
                </ListItem>
                <ListItem
                  sx={{
                    pl: 4,
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => navigate("/berkaspi")}
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
                      primary="PI"
                      primaryTypographyProps={{ style: { color: "#1E376D" } }}
                    />
                  </Button>
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              sx={{
                marginBottom: "10px",
              }}
            >
              <Button
                fullWidth
                onClick={() => navigate("/jadwal")}
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
            <ListItem
              sx={{
                marginBottom: "10px",
              }}
            >
              <Button
                fullWidth
                onClick={() => navigate("/hasil")}
                sx={{
                  color: "#1E376D",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#003366",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1E376D" }}>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Hasil"
                  primaryTypographyProps={{ style: { color: "#1E376D" } }}
                />
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
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
            Jadwal
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
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <Paper
              sx={{
                padding: 1,
                backgroundColor: "#FFFFFF",
                width: "100%",
                minHeight: "450px",
                minWidth: "500px",
              }}
            >
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

              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "#1E376D",
                  color: "white",
                  borderRadius: "10px",
                  maxWidth: "600px",
                  margin: "0 auto",
                  padding: "10px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        Tanggal :
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {console.log("Data jadwal", dataJadwal)}
                        {dataJadwal
                          ? new Date(
                              dataJadwal.hari_tanggal
                            ).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "Loading..."}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        Waktu :
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {dataJadwal?.waktu}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Lokasi :</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {dataJadwal?.tempat}
                      </TableCell>
                    </TableRow>
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

export default Jadwal;
