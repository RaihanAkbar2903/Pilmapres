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

function DataPengguna() {
    const [openLaman, setOpenLaman] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false);  
    const [selectedUser, setSelectedUser] = useState(null); 
    const [editedUser, setEditedUser] = useState({
        username: '',
        password: '',
        role: '',
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditedUser({ ...user, password: user.id }); 
        setOpenEdit(true); 
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setOpenDelete(true); 
    };

    const handleSaveEdit = () => {
        console.log("Data yang diubah:", editedUser);
        setOpenEdit(false);
    };

    const handleDeleteConfirm = () => {
        console.log("Data yang dihapus:", selectedUser);
        setOpenDelete(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleToggleLaman = () => {
        setOpenLaman(!openLaman);
    };

    const pengguna = [
        { id: '001', username: 'Sesa Febrius Trialaka', role: 'Peserta' },
        { id: '002', username: 'Satria Bintang Putra', role: 'Juri' },
        { id: '003', username: 'Maudy Rahayu', role: 'Juri' },
        { id: '004', username: 'Cecilia Pratiwi', role: 'Peserta' },
        { id: '005', username: 'Ahmad Solihin', role: 'Admin' },
        { id: '006', username: 'Claudy Manaud', role: 'Admin' },
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
                        Data Pengguna
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
                                Pengguna
                            </Typography>
                            <Button 
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
                                            <TableCell sx={{ color: '#FFFFFF'}}>ID User</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama User</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Role</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pengguna.map((row, index) => (
                                            <TableRow key={row.id}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.role}</TableCell>
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
                    Edit Pengguna
                </DialogTitle>
                <DialogContent>
                    <InputLabel sx={{ color:'white' }} >Username</InputLabel>
                    <TextField
                        margin="dense"
                        type="text"
                        fullWidth
                        name="username"
                        value={editedUser.username}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Password</InputLabel>
                    <TextField 
                        margin="dense"
                        type="password"
                        fullWidth
                        name="password"
                        value={editedUser.password}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color:'white' }} >Role</InputLabel>
                    <FormControl fullWidth margin="dense">
                        <Select
                            value={editedUser.role}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                        >
                            <MenuItem value="Peserta"> Mahasiswa </MenuItem>
                            <MenuItem value="Juri"> Juri </MenuItem>
                            <MenuItem value="Admin"> Admin </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px'  }} >Batal</Button>
                    <Button onClick={handleSaveEdit} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px'}} >Simpan</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>
                    <Typography>Apakah Anda yakin ingin menghapus akun {selectedUser?.username}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px'}}>Batal</Button>
                    <Button onClick={handleDeleteConfirm} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px'  }} >Hapus</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DataPengguna;
