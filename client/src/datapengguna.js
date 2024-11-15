import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [editedUser, setEditedUser] = useState({
        username: '',
        password: '',
        role: '',
    });
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: '',
    });
    const [pengguna, setPengguna] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Fetch data from backend
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/datapengguna');
            const data = await response.json();
            setPengguna(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditedUser({ ...user, password: '' }); 
        setOpenEdit(true); 
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setOpenDelete(true); 
    };

    const handleSaveEdit = async () => {
        try {
            const editData = editedUser.password
                ? editedUser
                : { ...editedUser, password: undefined };
            await axios.put(`http://localhost:5000/datapengguna/${editedUser.id_pengguna}`, editData);
            fetchData();
            setOpenEdit(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/datapengguna/${selectedUser.id_pengguna}`);
            fetchData();
            setOpenDelete(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

const handleAddUser = async () => {
    try {
        const response = await axios.post('http://localhost:5000/datapengguna', newUser);
        if (response.status === 201) {
            await fetchData(); 
            setOpenAdd(false); 
            setNewUser({ username: '', password: '', role: ''});
        } else {
            console.error("Failed to add user, server returned:", response.status);
        }
    } catch (error) {
        console.error("Error adding user:", error);
    }
};
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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
                                onClick={() => setOpenAdd(true)}
                                sx={{ marginBottom: 2, backgroundColor: '#003366', minWidth: '20vh' }}
                                >
                                Tambah
                            </Button>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama User</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Role</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pengguna.map((row, index) => (
                                            <TableRow key={row.id_pengguna}  sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{index + 1}</TableCell>
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
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}  sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }}>
                <DialogTitle>Tambah Pengguna</DialogTitle>
                <DialogContent>
                    <InputLabel sx={{ color: 'white' }}>Username</InputLabel>
                    <TextField
                        margin="dense"
                        type="text"
                        fullWidth
                        name="username"
                        value={newUser.username}
                        onChange={handleNewUserChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color: 'white' }}>Password</InputLabel>
                    <TextField
                        margin="dense"
                        type="password"
                        fullWidth
                        name="password"
                        value={newUser.password}
                        onChange={handleNewUserChange}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                    />
                    <InputLabel sx={{ color: 'white' }}>Role</InputLabel>
                    <FormControl fullWidth margin="dense">
                        <Select
                            name="role"
                            value={newUser.role}
                            onChange={handleNewUserChange}
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                        >
                            <MenuItem value="Mahasiswa">Mahasiswa</MenuItem>
                            <MenuItem value="Juri">Juri</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={() => setOpenAdd(false)} sx={{ backgroundColor: '#FE651F', color: '#FFFFFF', borderRadius: '4px' }}>Batal</Button>
                        <Button onClick={handleAddUser} sx={{ backgroundColor: '#0DBD2E', color: '#FFFFFF', borderRadius: '4px' }}>Simpan</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
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
                            name='role'
                            value={editedUser.role}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px' }}
                        >
                            <MenuItem value="Mahasiswa"> Mahasiswa </MenuItem>
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
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} sx={{ '& .MuiDialog-paper': { backgroundColor: '#003366', borderRadius: '8px', color: 'white', width: '100%' } }}>
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
