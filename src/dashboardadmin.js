import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Menu, IconButton } from '@mui/material';
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
import  ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Logo from './assets/images/logopilmapres.png';
import { useNavigate } from 'react-router-dom';

function DashboardAdmin() {
    const [openLaman, setOpenLaman] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); 

    const handleToggleLaman = () => {
        setOpenLaman(!openLaman);
    };

    const rows = [
        { no: 1, idBerkas: '001', namaBerkas: 'Olimpiade Nasional', jenis: 'CU', status: 'Disetujui' },
        { no: 2, idBerkas: '002', namaBerkas: 'Olimpiade Matematika', jenis: 'CU', status: 'Menunggu' },
        { no: 3, idBerkas: '003', namaBerkas: 'Pencak Silat Provinsi', jenis: 'CU', status: 'Ditolak' },
        { no: 4, idBerkas: '004', namaBerkas: 'Gelang Bambu Muda', jenis: 'CU', status: 'Disetujui' },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'Disetujui':
                return '#4CAF50'; 
            case 'Menunggu':
                return '#FFC107'; 
            case 'Ditolak':
                return '#F44336'; 
            default:
                return '#000'; 
        }
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
                        Beranda
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
                            <Grid container spacing={6} sx={{ marginBottom: '25px'}}>
                                <Grid item xs={6}>
                                    <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#1E376D' }}>
                                        <PeopleIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
                                        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                                            Pengguna Aktif
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#FFFFFF'}}>50</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#1E376D' }}>
                                        <InsertDriveFileIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
                                        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                                            Total Berkas
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#FFFFFF'}} >200</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1E376D' }}>
                                Berkas Terbaru
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1E376D' }}>
                                        <TableRow >
                                            <TableCell sx={{ color: '#FFFFFF'}}>No</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>ID Berkas</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Nama Berkas</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Jenis</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF'}}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={row.no} sx={{ backgroundColor: index % 2 === 0 ? '#E8F0FE' : '#ffffff'}}>
                                                <TableCell>{row.no}</TableCell>
                                                <TableCell>{row.idBerkas}</TableCell>
                                                <TableCell>{row.namaBerkas}</TableCell>
                                                <TableCell>{row.jenis}</TableCell>
                                                <TableCell sx={{ color: getStatusColor(row.status), fontWeight: 'bold' }}>{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}

export default DashboardAdmin;
