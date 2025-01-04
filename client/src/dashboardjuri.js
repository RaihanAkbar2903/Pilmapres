import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, MenuItem, IconButton, Menu } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Banner from './assets/images/bannnerpilmapres.jpeg';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function DashboardJuri() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dataBanner, setDataBanner] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchDataBanner();
    }, []);

    const fetchDataBanner = async () => {
        try {
            const response = await fetch('http://localhost:5000/banner');
            const data = await response.json();
            setDataBanner(data);
        } catch (err) {
            console.error('Terjadi kesalahan:', err);
        }
    };
    const handleAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    }

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
        <Box sx={{ display: 'flex'}}>
            <Box sx={{ 
                width: '250px', 
                backgroundColor: '#FFFFFF', 
                padding: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderRight: '2px solid #E0E0E0',
                minHeight: '100vh',
                height: 'auto',
                flexShrink: 0
            }}>
                <Box>
                    <Box sx={{ textAlign: 'center', marginBottom: 0, marginRight: 7 }}>
                        <img src={Logo} alt="Logo Pilmapres" style={{ width: '120px' }} />
                    </Box>
                    <List sx={{ padding: 0 }}>
                        <ListItem sx={{ marginBottom: '10px', alignItems: "center" }}>
                            <Button 
                                fullWidth
                                onClick={() => navigate('/dashboardjuri')} 
                                sx={{ 
                                    color: '#1E376D',
                                    display: "flex",
                                    justifyContent: "flex-start", 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D', minWidth: "40px", display: "flex", alignItems: "center" }}><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Beranda" primaryTypographyProps={{ style: { color: '#1E376D', fontSize: "14px" } }} 
                                    sx={{margin: 0, display: "flex", alignItems: "center"}}
                                />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', alignItems: "center" }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/peserta')}
                                sx={{ 
                                    color: '#1E376D',
                                    display: "flex",
                                    justifyContent: "flex-start", 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D', minWidth: "40px", display: "flex", alignItems: "center" }}><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="Peserta" primaryTypographyProps={{ style: { color: '#1E376D', fontSize: "14px" } }} 
                                    sx={{margin: 0, display: "flex", alignItems: "center"}}
                                />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', alignItems: "center" }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/berkasjuri')}
                                sx={{ 
                                    color: '#1E376D',
                                    display: "flex",
                                    justifyContent: "flex-start", 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D', minWidth: "40px", display: "flex", alignItems: "center" }}><DescriptionIcon /></ListItemIcon>
                                <ListItemText primary="Berkas" primaryTypographyProps={{ style: { color: '#1E376D', fontSize: "14px" } }} 
                                    sx={{margin: 0, display: "flex", alignItems: "center"}}
                                />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', alignItems: "center" }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/presentasijuri')}
                                sx={{ 
                                    color: '#1E376D',
                                    display: "flex",
                                    justifyContent: "flex-start", 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D', minWidth: "40px", display: "flex", alignItems: "center" }}><PresentToAllIcon /></ListItemIcon>
                                <ListItemText primary="Presentasi" primaryTypographyProps={{ style: { color: '#1E376D', fontSize: "14px" } }}
                                    sx={{margin: 0, display: "flex", alignItems: "center"}}
                                />
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                <Paper elevation={1} sx={{ padding: 2, marginBottom: 0, backgroundColor: '#003366', borderRadius: 0 }}>
                    <Typography variant="h5" sx={{ color: '#FFFFFF' }}>
                        Beranda
                    </Typography>
                    <IconButton
                            color="inherit"
                            onClick={handleAccountClick}
                            sx={{ color: 'white', '&:hover': {backgroundColor: '#E0E0E0', color: '#003366' }, '& svg':{ fontSize: 36,}, position: 'absolute', top: 10, right: 30 }}
                        >
                            <ExitToAppIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseAccountMenu}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                </Paper>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', width: '100%' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E376D', textAlign: 'center', marginBottom: -1, }}>
                                Pemilihan Mahasiswa Berprestasi
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E376D', textAlign: 'center', marginBottom: 4, }}>
                                Politeknik Negeri Batam
                            </Typography>
                            <img 
                                alt="Banner Pilmapres" 
                                src={`http://localhost:5000/uploads/${dataBanner?.image}`}
                                style={{ width: '80%', height: 'auto' }} 
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default DashboardJuri;
