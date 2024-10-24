import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom'; // Tambahkan Link di sini
import Logo from './assets/images/logopilmapres.png';
import Background from './assets/images/backgroundpilmapres.jpg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

function Login() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah NIM atau password kosong
    if (!nim || !password) {
      setError('NIM dan Password harus diisi!');
      return;
    }

    // Validasi NIM dan password
    if (nim === '3312311005' && password === '123') {
      localStorage.setItem('nim', nim);
      navigate('/dashboardmahasiswa');
    } else {
      setError('Nim atau password salah');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xs" style={{ padding: '40px, 0'}}>
        <StyledPaper>
          <img src={Logo} alt="Logo Pilmapres" style={{ width: '150px', marginBottom: '20px' }} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="No. Induk Mahasiswa"
              variant="outlined"
              fullWidth
              margin="normal"
              id="nim"
              name="nim"
              autoComplete="nim"
              autoFocus
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              error={!!error && !nim} // Tampilkan error jika nim kosong
              helperText={!nim && error ? 'NIM harus diisi' : ''}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password} // Tampilkan error jika password kosong
              helperText={!password && error ? 'Password harus diisi' : ''}
            />

            {/* Tampilkan pesan error umum */}
            {error && <Typography color="error">{error}</Typography>}

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: '#003366',
                color: '#fff',
                marginTop: '20px',
                padding: '10px',
                '&:hover': {
                  backgroundColor: '#002244',
                },
              }}
            >
              Login
            </Button>
          </Box>

          {/* Teks untuk Navigasi ke Halaman Daftar */}
          <Typography sx={{ mt: 2 }}>
            Belum memiliki akun?{' '}
            <Link to="/Registrasi" style={{ color: '#003366', textDecoration: 'none' }}>
              Daftar disini
            </Link>
          </Typography>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default Login;
