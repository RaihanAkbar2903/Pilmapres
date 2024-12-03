import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, MenuItem, IconButton, Menu,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import InfoIcon from '@mui/icons-material/Info'; 
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function Peserta() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const [peserta, setPeserta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const fetchDetailPeserta = async (id) => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/peserta/${id}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedPeserta(data);
            setOpenDialog(true);
          } else {
            console.error("Gagal mengambil detail peserta:", await response.text());
          }
        } catch (err) {
          console.error("Terjadi kesalahan saat mengambil detail peserta:", err);
        } finally {
          setLoading(false);
        }
      };

    const handleInfoClick = (peserta) => {
       fetchDetailPeserta(peserta.id);
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

      useEffect(() => {
        const fetchPeserta = async () => {
            try {
                const response = await fetch('http://localhost:5000/peserta');
                const data = await response.json();
                console.log('Data peserta:', data); 
                setPeserta(data);
            } catch (err) {
                console.error('Error fetching peserta:', err);
            }
        };
            fetchPeserta();
      }, []);
    

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
                                        {peserta?.map((peserta, index) => (
                                            <TableRow key={index}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{peserta.nim}</TableCell>
                                                <TableCell>{peserta.namaLengkap}</TableCell>
                                                <TableCell>{peserta.prodi}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleInfoClick(peserta)}>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%', padding: 2} }}>
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
                                <Box sx={{ marginBottom: 2 }} >
                                    <img
                                        src={`http://localhost:5000/uploads/foto/${selectedPeserta.foto}` }
                                        alt="Foto Peserta"
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid #1E376D',
                                            marginTop: '300px',
                                        }}
                                    />
                                </Box>
                                {[
                                    { label: 'Nama', value: selectedPeserta.namaLengkap },
                                    { label: 'NIM', value: selectedPeserta.nim },
                                    { label: 'Tempat, Tanggal Lahir', value: `${selectedPeserta.tempat}, ${dayjs(selectedPeserta.tanggalLahir).format('DD MMMM YYYY')}` },
                                    { label: 'Jenis Kelamin', value: selectedPeserta.jenisKelamin},
                                    { label: 'No. HP', value: selectedPeserta.noHp },
                                    { label: 'Alamat E-mail', value: selectedPeserta.email },
                                    { label: 'Program Studi', value: selectedPeserta.prodi },
                                    { label: 'Program Pendidikan', value: selectedPeserta.programPendidikan}
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
