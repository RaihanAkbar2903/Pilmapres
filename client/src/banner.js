import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, DialogTitle, DialogContent, MenuItem, DialogActions, Dialog, Menu } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import WebIcon from '@mui/icons-material/Web'; 
import ImageIcon from '@mui/icons-material/Image'; 
import InfoIcon from '@mui/icons-material/Info'; 
import EventIcon from '@mui/icons-material/Event'; 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/images/logopilmapres.png';
import BannerImage from './assets/images/bannnerpilmapres.jpeg';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const [openLaman, setOpenLaman] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] =useState(false);
    const [dataBanner, setDataBanner] = useState(null);
    const [newBanner, setNewBanner] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataBanner();
    }, []);

    const fetchDataBanner = async () => {
        try {
            const response = await fetch('http://localhost:5000/banner');
            const data = await response.json();
            setDataBanner(data);
        } catch (error) {
            console.error('Gagal mengambil data banner:', error);
        }
    }

    const handleToggleLaman = () => {
        setOpenLaman(!openLaman);
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
          await fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          // Hapus token dari localStorage
          localStorage.removeItem('token');
    
          // Redirect ke halaman login
          navigate('/login');
        } catch (err) {
          console.error('Logout gagal:', err);
        }
      };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleBannerChange = (event) => {
        setNewBanner(event.target.files[0]);
    };

    const handleBannerSave = async () => {
        try {
            const formData = new FormData();
            formData.append('image', newBanner);
            const response = await fetch('http://localhost:5000/banner', {
                method: 'POST',
                body: formData,
            });
            console.log(response);
            
            if (!response.ok) {
                throw new Error('Gagal menyimpan banner');
            }
            fetchDataBanner();
            handleCloseDialog();
            console.log('Berhasil menyimpan banner');
        } catch (error) {
            console.error('Gagal menyimpan banner:', error);
        }
    }

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
            }}>
                <Box>
                    <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                        <img src={Logo} alt="Logo Pilmapres" style={{ width: '120px' }} />
                    </Box>
                    <List sx={{ padding: 0 }}>
                        <ListItem sx={{ marginBottom: '10px', }}>
                            <Button 
                                fullWidth
                                onClick={() => navigate('/dashboardadmin')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Beranda" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/datapengguna')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="Pengguna" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/berkasadmincu')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                <ListItemText primary="Berkas" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/jadwalpresentasi')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><PresentToAllIcon /></ListItemIcon>
                                <ListItemText primary="Presentasi" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', }}>
                            <Button 
                                fullWidth
                                onClick={handleToggleLaman} 
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0', 
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><WebIcon /></ListItemIcon>
                                <ListItemText primary="Laman" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                                {openLaman ? <ExpandLess sx={{ color: '#1E376D' }} /> : <ExpandMore sx={{ color: '#1E376D' }} />}
                            </Button>
                        </ListItem>
                        <Collapse in={openLaman} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem sx={{ pl: 4, marginBottom: '10px', }}>
                                    <Button 
                                        fullWidth
                                        onClick={() => navigate('/banner')}
                                        sx={{ 
                                            color: '#1E376D', 
                                            '&:hover': { 
                                                backgroundColor: '#E0E0E0', 
                                                color: '#003366', 
                                            }, 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><ImageIcon /></ListItemIcon>
                                        <ListItemText primary="Banner" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                                    </Button>
                                </ListItem>
                                <ListItem sx={{ pl: 4, marginBottom: '10px', }}>
                                    <Button 
                                        fullWidth
                                        onClick={() => navigate('/informasi')}
                                        sx={{ 
                                            color: '#1E376D', 
                                            '&:hover': { 
                                                backgroundColor: '#E0E0E0', 
                                                color: '#003366', 
                                            }, 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><InfoIcon /></ListItemIcon>
                                        <ListItemText primary="Informasi" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                                    </Button>
                                </ListItem>
                                <ListItem sx={{ pl: 4, marginBottom: '10px', }}>
                                    <Button 
                                        fullWidth
                                        onClick={() => navigate('/jadwalpilmapres')}
                                        sx={{ 
                                            color: '#1E376D', 
                                            '&:hover': { 
                                                backgroundColor: '#E0E0E0', 
                                                color: '#003366', 
                                            }, 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><EventIcon /></ListItemIcon>
                                        <ListItemText primary="Jadwal" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                                    </Button>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1}}>
                <Paper elevation={1} sx={{ padding: 2, marginBottom: 3, backgroundColor: '#003366', borderRadius: 0 }}>
                    <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                        Kelola Banner
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
                <Grid container spacing={3} justifyContent="flex-end" sx={{ padding: 3 }}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 1, backgroundColor: '#FFFFFF' }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E376D', textAlign: 'center', marginBottom: 3 }}>
                                Banner
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                                <img src={`http://localhost:5000/uploads/${dataBanner?.image}`} alt="Current Banner" style={{ width: '100%', maxWidth: '750px', borderRadius: '8px' }} />
                                <Button variant="contained" onClick={handleOpenDialog} sx={{ marginTop: 4, alignSelf: 'flex-end', fontSize: '1rem', color: 'white', backgroundColor: '#003366' }}>
                                    Edit Banner
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }} >
                <DialogTitle>Ganti Banner</DialogTitle>
                <DialogContent>
                    <input type="file" onChange={handleBannerChange} accept="image/*" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px' }} >Batal</Button>
                    <Button onClick={handleBannerSave} color="primary" sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px' }} >Simpan</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Banner;
