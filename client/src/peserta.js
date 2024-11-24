import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, MenuItem, IconButton, Menu,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import InfoIcon from '@mui/icons-material/Info'; 
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function Peserta() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); 

    const handleInfoClick = (peserta) => {
        setSelectedPeserta(peserta);
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPeserta(null);
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

      const peserta = [
        {
            id_pengguna: 1,
            nim: "3312311005",
            namaLengkap: "Muhammad Alfath Ramadhan",
            prodi: "D3 Teknik Informatika",
        },
        {
            id_pengguna: 2,
            nim: "3312311102",
            namaLengkap: "Sesa Febrius Trialaka",
            prodi: "D3 Teknik Informatika",
        },
        {
            id_pengguna: 3,
            nim: "3312311006",
            namaLengkap: "Nurafifah Yusdi",
            prodi: "D4 Teknik Informatika",
        },
    ];
    
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
                                onClick={() => navigate('/dashboardjuri')} 
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
                                onClick={() => navigate('/peserta')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    }, 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="Peserta" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
                            </Button>
                        </ListItem>
                        <ListItem sx={{ marginBottom: '10px', }}>
                        <Button 
                                fullWidth
                                onClick={() => navigate('/berkasjuri')}
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
                                onClick={() => navigate('/presentasijuri')}
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
                    </List>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                <Paper elevation={1} sx={{ padding: 2, marginBottom: 3, backgroundColor: '#003366', borderRadius: 0 }}>
                    <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                        Peserta
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
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E376D', textAlign: 'center', marginBottom: 4 }}>
                                Peserta Pilmapres
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>NIM</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama Peserta</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Prodi</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {peserta.map((row, index) => (
                                            <TableRow key={row.id_pengguna}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.nim}</TableCell>
                                                <TableCell>{row.namaLengkap}</TableCell>
                                                <TableCell>{row.prodi}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleInfoClick(row)}>
                                                        <InfoIcon sx={{ color: '#003366' }} />
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
            <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%', padding: 2, overflow: 'visible'} }}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', padding: 1}} >Data Peserta</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }} >
                    <Paper 
                        elevation={3} 
                        sx={{ 
                        width: '100%', 
                        maxWidth: 500, 
                        padding: 3, 
                        marginTop: 2, 
                        borderRadius: 4, 
                        textAlign: 'center', 
                        backgroundColor: '#FFFFFF' 
                        }}
                    >
                        {selectedPeserta && (
                            <>
                                {[
                                    { label: 'Nama', value: selectedPeserta.namaLengkap },
                                    { label: 'NIM', value: selectedPeserta.nim },
                                    { label: 'Tempat, Tanggal Lahir', value: selectedPeserta.ttl },
                                    { label: 'No. HP', value: selectedPeserta.noHp },
                                    { label: 'Alamat E-mail', value: selectedPeserta.email },
                                    { label: 'Program Studi', value: selectedPeserta.prodi },
                                ].map((item, index) => (
                                    <Box 
                                        key={index}
                                        sx={{ 
                                            textAlign: 'left',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            paddingY: 1.5, 
                                            borderBottom: '1px solid #1E376D' 
                                        }}
                                    >
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: '#E94A0D', 
                                                minWidth: '50%' 
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                textAlign: 'left', 
                                                flex: 1, 
                                                color: '#1E376D',
                                                fontWeight: 'bold' 
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </>
                        )}
                    </Paper>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flexend', marginTop: 1, paddingX: 3, paddingBottom: 1 }}>
                            <Button 
                                onClick={handleCloseDialog} 
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: '#E94A0D', 
                                    color: '#FFFFFF', 
                                    fontWeight: 'bold', 
                                    paddingX: 5, 
                                    borderRadius: 5,
                                    '&:hover': { backgroundColor: '#D83908' }
                                }}
                            >
                                Tutup
                            </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default Peserta;