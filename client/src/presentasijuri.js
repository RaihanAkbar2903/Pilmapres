import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, MenuItem, IconButton, Menu,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/images/logopilmapres.png';
import { Await, useNavigate } from 'react-router-dom';

function PresentasiJuri() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dataPresentasi, setDataPresentasi] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/jadwalpresentasi',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log('Data Presentasi:', data);
            
            setDataPresentasi(data);
        } catch (err) {
            console.error('Gagal mengambil data presentasi:', err);
        }
    };
    const [formValues, setFormValues] = useState({
      content: "",
      accuracy: "",
      fluency: "",
      pronounciation: "",
      overall_performance: "",
    });

    const handleInfoClick = async (peserta) => {
        try {
            setFormValues({
                content: "",
                accuracy: "",
                fluency: "",
                pronounciation: "",
                overall_performance: "",
            });
            const response = await fetch(`http://localhost:5000/jadwalpresentasi/${peserta.id}`);
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data');
            }
            const data = await response.json();
            console.log('Data jadwal:', data);
            
            const newFormat = {
              content: data.nilai.content?.skor || null,
              accuracy: data.nilai.accuracy?.skor || null,
              fluency: data.nilai.fluency?.skor || null,
              pronounciation: data.nilai.pronounciation?.skor || null,
              overall_performance: data.nilai.overall_performance?.skor || null,
            };
            setFormValues(newFormat);
            console.log('formValues:', newFormat);
            
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
        setSelectedPeserta(peserta);
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPeserta(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        try {
            const response = fetch(`http://localhost:5000/jadwalpresentasi/${selectedPeserta.id}/nilai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim data');
            }
            alert('Data berhasil disimpan');
            fetchData();
        } catch (error) {
            console.error('Gagal mengirim data:', error);
        }
        console.log('Submitted Data:', formValues);
        handleCloseDialog();
    }

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
                        Presentasi
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
                                Nilai Presentasi
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>NIM</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama Peserta</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Prodi</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nilai</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataPresentasi?.map((row, index) => (
                                            <TableRow key={row.id_pengguna}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.nim}</TableCell>
                                                <TableCell>{row.namaLengkap}</TableCell>
                                                <TableCell>{row.prodi}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleInfoClick(row)}>
                                                        <UploadFileIcon sx={{ color: '#003366' }} />
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
            <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', padding: 3} }}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', padding: 1}} >Input Nilai</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, overflow: 'hidden' }} >
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
                        {['Content', 'Accuracy', 'Fluency', 'Pronounciation', 'Overall Performance'].map((label) => {
                            let name = label.replace(/\s/g, '_').toLowerCase();
                            let value = formValues[name];
                            return (
                                <TextField
                                    key={label}
                                    name={name}
                                    label={label}
                                    variant="outlined"
                                    fullWidth
                                    value={value}
                                    onChange={handleChange}
                                    type='number'
                                    sx={{
                                        marginBottom: 1,
                                        '& .MuiInputBase-root': { backgroundColor: '#FFFFFF', borderRadius: 2 },
                                        '& .MuiFormLabel-root': { color: '#003366' },
                                        '& .MuiInputBase-input': { color: '#000000' },
                                    }}
                                />
                            );
                        })}
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
                            <Button 
                                onClick={handleSubmit} 
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: '#0DBD2E', 
                                    color: '#FFFFFF', 
                                    fontWeight: 'bold', 
                                    paddingX: 5, 
                                    borderRadius: 5,
                                    '&:hover': { backgroundColor: '#0A9A24' }
                                }}
                            >
                                Simpan
                            </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default PresentasiJuri;
