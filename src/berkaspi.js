import React, { useState } from 'react';
import { 
    Box, Button, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, 
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, 
    DialogContent, DialogTitle, IconButton, MenuItem, Menu
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function BerkasPI() {
    const [openBerkas, setOpenBerkas] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleToggleBerkas = () => {
        setOpenBerkas(!openBerkas);
    };

    const handleOpenDialog = () => {
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

    const handleLogout = () => {
        navigate('/login');
    };
    const rows = [
        { no: 1, kategori: 'Akademik', bidang: 'Penelitian', wujud: 'Makalah', namaBerkas: 'Makalah Penelitian.pdf', status: 'Sudah Diunggah' },
        { no: 2, kategori: 'Non-Akademik', bidang: 'Organisasi', wujud: 'Piagam', namaBerkas: 'Piagam Organisasi.pdf', status: 'Belum Diunggah' },
        { no: 3, kategori: 'Akademik', bidang: 'Lomba', wujud: 'Sertifikat', namaBerkas: 'Sertifikat Lomba.pdf', status: 'Sudah Diunggah' },
    ];

    return (
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
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Beranda" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                <ListItemText primary="Berkas" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary="CU" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#1E376D' }}><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary="PI" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                                    } 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><EventIcon /></ListItemIcon>
                                <ListItemText primary="Jadwal" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                                    } 
                                }}
                            >
                                <ListItemIcon sx={{ color: '#1E376D' }}><StarIcon /></ListItemIcon>
                                <ListItemText primary="Hasil" primaryTypographyProps={{ style: { color: '#1E376D' } }} />
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
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                     <Paper sx={{ padding: 1, backgroundColor: '#FFFFFF' }}>
                        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
                            Produk Inovatif
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<UploadFileIcon />} 
                            onClick={handleOpenDialog} 
                            sx={{ marginBottom: 2, backgroundColor: '#003366' }}
                        >
                            Unggah Berkas
                        </Button>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#003366' }}>
                                        <TableCell sx={{ color: '#ffffff' }}>No</TableCell>
                                        <TableCell sx={{ color: '#ffffff' }}>Nama Berkas</TableCell>
                                        <TableCell sx={{ color: '#ffffff' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={row.no} sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}} >
                                            <TableCell>{row.no}</TableCell>
                                            <TableCell>{row.namaBerkas}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Dialog open={openDialog} onClose={handleCloseDialog} 
                            sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '80 %' } }}>
                            <DialogTitle>
                                Unggah Berkas
                                <IconButton 
                                    aria-label="close" 
                                    onClick={handleCloseDialog} 
                                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2}} >
                                <Button 
                                variant="contained" 
                                component="label"
                                sx={{ backgroundColor: '#1E376D', color: '#FFFFFF', borderRadius: '4px', textTransform: 'none', }}>
                                Choose File
                                <input type="file" hidden />
                                </Button>
                             </Box> 
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} sx={{  backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px' }}>Batal</Button>
                                <Button onClick={handleCloseDialog} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px' }}>Unggah</Button>
                            </DialogActions>
                        </Dialog>
                     </Paper>
                    </Grid>
                </Grid>
            </Box> 
        </Box>
    );
}

export default BerkasPI;
