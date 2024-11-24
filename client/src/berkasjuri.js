import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, MenuItem, IconButton, Menu,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions , TextField} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People'; 
import PresentToAllIcon from '@mui/icons-material/PresentToAll'; 
import InfoIcon from '@mui/icons-material/Info'; 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function BerkasJuri() {
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); 

    const handleUploadClick = (row) => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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

      const [berkas] = useState([
        { id_pengguna: 1, namaberkas: 'Berkas 1', namaLengkap: 'Nama 1', prodi: 'Prodi 1' },
        { id_pengguna: 2, namaberkas: 'Berkas 2', namaLengkap: 'Nama 2', prodi: 'Prodi 2' },
      ]);
    
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
                        Berkas
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
                                Berkas 
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama Berkas</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama Peserta</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Prodi</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Detail</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nilai</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {berkas.map((row, index) => (
                                            <TableRow key={row.id_pengguna}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.namaberkas}</TableCell>
                                                <TableCell>{row.namaLengkap}</TableCell>
                                                <TableCell>{row.prodi}</TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <InfoIcon sx={{ color: '#003366' }} />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleUploadClick(row)} >
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
                        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', padding: 1, borderBottom: '1px solid #1E376D'}} >Input Nilai</DialogTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 5 }}>PENYAJIAN</Typography><br></br>

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Penggunaan Bahasa Indonesia yang Baik dan Benar</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kesesuaian pengutipan dan acuan standar</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>SUBSTANSI PRODUK INOVATIF</Typography>< br></br>

                                <Typography variant='h10' sx={{ fontWeight: 'bold', color: '#1E376D'}}>MASALAH</Typography><br></br>
                                
                                <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Fakta atau gejala lingkungan yang menarik</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Identifikasi masalah yang terdapat dalam fakta</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Adanya uraian pihak terdampak</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1, marginTop: 2 }}>SOLUSI</Typography><br></br>

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Rincian langkah-langkah untuk mencapai solusi</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai kebutuhan sumber daya</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai pihak penerima manfaat</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption' sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Uraian mengenai solusi yang berciri SMART</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='h8' sx={{ fontWeight: 'bold', color: '#1E376D'}}>KUALITAS PRODUK INOVATIF</Typography><br></br>
                                
                                <Typography variant='caption' noWrap sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Keunikan Produk</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1  }}>Orisinalitas Produk</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 } }} />

                                <Typography variant='caption'  sx={{ fontWeight: 'bold', color: '#1E376D', marginBottom: 1 }}>Kelayakan Produk</Typography>
                                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: 1, '& .MuiOutlinedInput-root': { width: 300 }   }} />
                            </Grid>
                        </Grid>
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
                                onClick={handleCloseDialog} 
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

export default BerkasJuri;
