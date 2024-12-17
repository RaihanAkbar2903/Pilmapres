import React, { useEffect, useState } from 'react';
import { 
    Box, Button, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, 
    Grid, Table, TableBody, TableCell, TableContainer, TableRow, MenuItem, Menu, IconButton,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StarIcon from '@mui/icons-material/Star';
import Logo from './assets/images/logopilmapres.png';
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Hasil() {
    const navigate = useNavigate();
    const [openBerkas, setOpenBerkas] = useState(false);
    const [data, setData] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/datapendaftaran/nilai/mahasiswa', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Gagal memuat data');
            }
            const responseData = await response.json();
            setData(responseData);
        } catch (err) {
            console.error('Gagal mengambil data:', err);
        }
    };

    const handleToggleBerkas = () => {
        setOpenBerkas(!openBerkas);
    };

    const handleAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    }

    const bgColor = ()=>{
        if (data?.keterangan === "menunggu") {
            return '#FFA500'
        } else if (data?.keterangan === "lolos") {
            return '#008000'
        }
        return '#FF0000'
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
      
    const theme = createTheme({
        typography: {
          fontFamily: 'Calistoga, sans-serif',
        },
      });
    

    return (
     <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
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
                        <ListItem 
                            sx={{ 
                                marginBottom: '10px',
                            }}
                        >
                            <Button 
                                fullWidth
                                onClick={() => navigate('/dashboardmahasiswa')} 
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0',
                                        color: '#003366',
                                    },
                                    fontFamily: 'Calistoga, sans-serif',
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Beranda" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                            </Button>
                        </ListItem>
                        <ListItem 
                            sx={{ 
                                marginBottom: '10px',
                            }}
                        >
                            <Button 
                                fullWidth
                                onClick={handleToggleBerkas} 
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0', 
                                        color: '#003366',
                                    }, 
                                    fontFamily: 'Calistoga, sans-serif',
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                <ListItemText primary="Berkas" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                                {openBerkas ? <ExpandLess sx={{ color: '#1E376D' }} /> : <ExpandMore sx={{ color: '#1E376D' }} />}
                            </Button>
                        </ListItem>
                        <Collapse in={openBerkas} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem 
                                    sx={{ 
                                        pl: 4, 
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Button 
                                        fullWidth
                                        onClick={() => navigate('/berkascu')}
                                        sx={{ 
                                            color: '#1E376D', 
                                            '&:hover': { 
                                                backgroundColor: '#E0E0E0', 
                                                color: '#003366', 
                                            },
                                            fontFamily: 'Calistoga, sans-serif',
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary="CU" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                                    </Button>
                                </ListItem>
                                <ListItem 
                                    sx={{ 
                                        pl: 4, 
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Button 
                                        fullWidth
                                        onClick={() => navigate('/berkaspi')}
                                        sx={{ 
                                            color: '#1E376D', 
                                            '&:hover': { 
                                                backgroundColor: '#E0E0E0', 
                                                color: '#003366', 
                                            }, 
                                            fontFamily: 'Calistoga, sans-serif',
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary="PI" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                                    </Button>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem 
                            sx={{ 
                                marginBottom: '10px',
                            }}
                        >
                            <Button 
                                fullWidth
                                onClick={() => navigate('/jadwal')}
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0', 
                                        color: '#003366', 
                                    },
                                    fontFamily: 'Calistoga, sans-serif',
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><EventIcon /></ListItemIcon>
                                <ListItemText primary="Jadwal" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                            </Button>
                        </ListItem>
                        <ListItem 
                            sx={{ 
                                marginBottom: '10px',
                            }}
                        >
                            <Button 
                                fullWidth
                                onClick={() => navigate('/hasil')} 
                                sx={{ 
                                    color: '#1E376D', 
                                    '&:hover': { 
                                        backgroundColor: '#E0E0E0', 
                                        color: '#003366', 
                                    },
                                    fontFamily: 'Calistoga, sans-serif',
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><StarIcon /></ListItemIcon>
                                <ListItemText primary="Hasil" primaryTypographyProps={{ style: { color: '#1E376D', fontFamily: 'Calistoga, sans-serif' } }} />
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                <Paper elevation={1} sx={{ padding: 2, marginBottom: 3, backgroundColor: '#003366', borderRadius: 0 }}>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontFamily: 'Calistoga, sans-serif' }}>
                        Hasil
                    </Typography>
                </Paper>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                     <Paper sx={{ padding: 1, backgroundColor: '#FFFFFF', width: '100%', minHeight: '450px', minWidth:'500px' }}>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E376D', textAlign: 'center', marginBottom: 4 }}>
                            Hasil Seleksi
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
                        <TableContainer component={Paper} sx={{ backgroundColor: '#1E376D', color: 'white', borderRadius: '10px', maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'Calistoga, sans-serif' }}>Nama :</TableCell>
                                        <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'Calistoga, sans-serif' }}>{data?.namaLengkap}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'Calistoga, sans-serif' }}>NIM :</TableCell>
                                        <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'Calistoga, sans-serif' }}>{data?.nim}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontFamily: 'Calistoga, sans-serif' }}>Status :</TableCell>
                                        {data?.keterangan === "menunggu" ?(
                                            <TableCell sx={{ color: bgColor(), fontFamily: 'Calistoga, sans-serif' }}>Menunggu</TableCell>
                                        ): data?.keterangan === "lolos" ?(
                                            <TableCell sx={{ color: bgColor(), fontFamily: 'Calistoga, sans-serif' }}>Lolos</TableCell>
                                        ):(
                                            <TableCell sx={{ color: bgColor(), fontFamily: 'Calistoga, sans-serif' }}>Tidak Lolos</TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        <Button 
                            variant="contained" 
                            startIcon={<MilitaryTechIcon />}
                            color="warning"
                            onClick={handleOpenDialog}
                            sx={{
                                mt: 4,
                            }}
                        >
                            Lihat Nilai
                        </Button>
                        </TableContainer>
                     </Paper>
                     <Dialog open={openDialog} onClose={handleCloseDialog} disableScrollLock sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '12px', color: 'white', width: '80%', padding: 2,  maxWidth: '800px', position: 'absolute', top: 0} }}>
                        <DialogContent>
                            <Paper
                                sx={{
                                width: '100%',
                                padding: 2,
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                                color: '#1E376D',
                                boxShadow: 3,
                                }}
                            >
                                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', padding: 1, borderBottom: '1px solid #1E376D'}} >Detail Nilai</DialogTitle>
                                <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#1E376D', marginTop: 2, marginBottom: 2  }}>Nilai Inovatif: {data?.inovatif?.nilai?.total}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                        <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 5 }}>PENYAJIAN</Typography><br></br>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Penggunaan Bahasa Indonesia yang Baik dan Benar</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='penyajian.0' value={data?.inovatif?.nilai?.penyajian1?.skor} readonly />
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kesesuaian pengutipan dan acuan standar</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='penyajian.1' value={data?.inovatif?.nilai?.penyajian2?.skor} readonly/>
                                        <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>SUBSTANSI PRODUK INOVATIF</Typography>< br></br>
                                        <Typography variant='h10' sx={{ fontWeight: 'bold', color: '#1E376D'}}>MASALAH</Typography><br></br>
                                        <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Fakta atau gejala lingkungan yang menarik</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='masalah.0' value={data?.inovatif?.nilai?.masalah1?.skor} readonly/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Identifikasi masalah yang terdapat dalam fakta</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='masalah.1' value={data?.inovatif?.nilai?.masalah2?.skor} readonly/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Adanya uraian pihak terdampak</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='masalah.2' value={data?.inovatif?.nilai?.masalah3?.skor} readonly/>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 2 }}>SOLUSI</Typography><br></br>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='solusi.0' value={data?.inovatif?.nilai?.solusi1?.skor} readonly/>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Rincian langkah-langkah untuk mencapai solusi</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='solusi.1' value={data?.inovatif?.nilai?.solusi2?.skor} readonly/>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai kebutuhan sumber daya</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='solusi.2' value={data?.inovatif?.nilai?.solusi3?.skor} readonly/>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='solusi.3' value={data?.inovatif?.nilai?.solusi4?.skor} readonly/>
                                        <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai solusi yang berciri SMART</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='solusi.4' value={data?.inovatif?.nilai?.solusi5?.skor} readonly/>
                                        <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>KUALITAS PRODUK INOVATIF</Typography><br></br>
                                        <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Keunikan Produk</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='kualitas.0' value={data?.inovatif?.nilai?.kualitas1?.skor} readonly/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1  }}>Orisinalitas Produk</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} name='kualitas.1' value={data?.inovatif?.nilai?.kualitas2?.skor} readonly/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kelayakan Produk</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 }   }}name='kualitas.2' value={data?.inovatif?.nilai?.kualitas3?.skor} readonly/>
                                    </Grid>
                                </Grid>
                                <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#1E376D', marginTop: 2, marginBottom: 2  }}>Nilai Presentasi: {data?.jadwal_presentasi?.total}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Content</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={data.jadwal_presentasi?.content?.skor} slotProps={{input: {readOnly: true,},}}/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Accuracy</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={data.jadwal_presentasi?.accuracy?.skor} slotProps={{input: {readOnly: true,},}}/>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Fluency</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={data.jadwal_presentasi?.fluency?.skor} slotProps={{input: {readOnly: true,},}}/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Pronunciation</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={data.jadwal_presentasi?.pronounciation?.skor} slotProps={{input: {readOnly: true,},}}/>
                                        <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Overall Performance</Typography>
                                        <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1 }} value={data.jadwal_presentasi?.overall_performance?.skor} slotProps={{input: {readOnly: true,},}}/>
                                    </Grid>
                                </Grid>
                                <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#1E376D', marginTop: 2, marginBottom: 2, textAlign: "center" }}>Nilai Total: {parseFloat((data?.jadwal_presentasi?.total + data?.inovatif?.nilai?.total)/2).toFixed(2)}</Typography>
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
                    </Grid>
                </Grid>
            </Box> 
        </Box>
     </ThemeProvider>
    );
}

export default Hasil;
