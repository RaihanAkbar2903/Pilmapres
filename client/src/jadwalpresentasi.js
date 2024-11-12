import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Dialog, Menu } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function JadwalPresentasi() {
    const [openLaman, setOpenLaman] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false);
    const [openTambah, setOpenTambah] = useState(false);
    const [newJadwal, setNewJadwal] = useState({
        peserta: '',
        haritanggal: '',
        tempat: '',
        waktu: '',
    }); 

    const [selectedJadwal, setSelectedJadwal] = useState(null); 
    const [editedJadwal, setEditedJadwal] = useState({
        peserta: '',
        haritanggal: '',
        tempat: '',
        waktu: '',
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleTambahClick = () => {
        setNewJadwal({
            peserta: '',
            haritanggal: '',
            tempat: '',
            waktu: '',
         });
         setOpenTambah(true);
    }

    const handleSaveTambah = () => {
        console.log("Data Jadwal Baru: ", newJadwal);
        setOpenTambah(false);
    };

    const handleChangeTambah = (e) => {
        const { name, value} = e.target;
        setNewJadwal((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditClick = (jadwal) => {
        setSelectedJadwal(jadwal);
        setEditedJadwal({ peserta: jadwal.peserta, haritanggal: jadwal.haritanggal, tempat: jadwal.tempat, waktu: jadwal.waktu }); 
        setOpenEdit(true); 
    };

    const handleDeleteClick = (jadwal) => {
        setSelectedJadwal(jadwal);
        setOpenDelete(true); 
    };

    const handleSaveEdit = () => {
        console.log("Data jadwal yang diubah:", editedJadwal);
        setOpenEdit(false);
    };

    const handleDeleteConfirm = () => {
        console.log("Data jadwal yang dihapus:", selectedJadwal);
        setOpenDelete(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedJadwal((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleToggleLaman = () => {
        setOpenLaman(!openLaman);
    };

    const jadwal = [
        { no: '1', peserta: 'Sesa Febrius Trialaka', haritanggal: '2024-10-01', tempat: 'Ruang A', waktu: '10:00' },
        { no: '2', peserta: 'Satria Bintang Putra', haritanggal: '2024-10-02', tempat: 'Ruang B', waktu: '13:00' },
        { no: '3', peserta: 'Maudy Rahayu', haritanggal: '2024-10-03', tempat: 'Ruang C', waktu: '15:00' }
    ];

    const handleAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        navigate('/login'); 
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
                        Kelola Jadwal
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
                                Jadwal Presentasi
                            </Typography>
                            <Button
                                onClick={handleTambahClick}
                                variant="contained" 
                                color="primary" 
                                sx={{ marginBottom: 2, backgroundColor: '#003366', minWidth: '20vh' }}
                                >
                                Tambah
                            </Button>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Peserta</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Hari/Tanggal</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Waktu</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Tempat</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {jadwal.map((row, index) => (
                                            <TableRow key={row.no}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{row.no}</TableCell>
                                                <TableCell>{row.peserta}</TableCell>
                                                <TableCell>{row.haritanggal}</TableCell>
                                                <TableCell>{row.tempat}</TableCell>
                                                <TableCell>{row.waktu}</TableCell>
                                                <TableCell>
                                                    <IconButton color='primary' onClick={() => handleEditClick(row)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton color='error' onClick={() => handleDeleteClick(row)}>
                                                        <DeleteIcon />
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
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }} >
                <DialogTitle>
                    Edit Jadwal
                </DialogTitle>
                <DialogContent>
                    <InputLabel sx={{ color:'white' }} >Peserta</InputLabel>
                    <TextField
                        margin="dense"
                        type="text"
                        fullWidth
                        name="peserta"
                        value={editedJadwal.peserta}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Hari/Tanggal</InputLabel>
                    <TextField 
                        margin="dense"
                        type="date"
                        fullWidth
                        name="haritanggal"
                        value={editedJadwal.haritanggal}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Tempat</InputLabel>
                    <TextField 
                        margin="dense"
                        type="text"
                        fullWidth
                        name="tempat"
                        value={editedJadwal.tempat}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Waktu</InputLabel>
                    <TextField 
                        margin="dense"
                        type="text"
                        fullWidth
                        name="waktu"
                        value={editedJadwal.waktu}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px'  }} >Batal</Button>
                    <Button onClick={handleSaveEdit} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px'}} >Simpan</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }} >
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>
                    <Typography>Apakah Anda yakin ingin menghapus Jadwal {selectedJadwal?.peserta}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px'}}>Batal</Button>
                    <Button onClick={handleDeleteConfirm} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px'  }} >Hapus</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openTambah} onClose={() => setOpenTambah(false)} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }}>
                <DialogTitle>Tambah Jadwal</DialogTitle>
                <DialogContent>
                    <InputLabel sx={{ color: 'white'}}>Peserta</InputLabel>
                    <TextField
                        margin="dense"
                        type="text"
                        fullWidth
                        name="peserta"
                        value={newJadwal.peserta}
                        onChange={handleChangeTambah}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Hari/Tanggal</InputLabel>
                    <TextField 
                        margin="dense"
                        type="date"
                        fullWidth
                        name="haritanggal"
                        value={newJadwal.haritanggal}
                        onChange={handleChangeTambah}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Tempat</InputLabel>
                    <TextField 
                        margin="dense"
                        type="text"
                        fullWidth
                        name="tempat"
                        value={newJadwal.tempat}
                        onChange={handleChangeTambah}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Waktu</InputLabel>
                    <TextField 
                        margin="dense"
                        type="text"
                        fullWidth
                        name="waktu"
                        value={newJadwal.waktu}
                        onChange={handleChangeTambah}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTambah(false)} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px'}}>Batal</Button>
                    <Button onClick={handleDeleteConfirm} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px'  }} >Tambah</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default JadwalPresentasi;