import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
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
  const [credential, setCredential] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credential || !password) {
      setError('NIM/Username dan Password harus diisi!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        const token = data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const role = decodedToken.role;

        if (role.toLowerCase() === 'mahasiswa') {
          navigate('/dashboardmahasiswa');
        } else if (role.toLowerCase() === 'admin') {
          navigate('/dashboardadmin');
        } else if (role.toLowerCase() === 'juri') {
          navigate('/dashboardjuri');
        } 
      } else {
        setError(data.error || 'Terjadi kesalahan saat login');
      }
    } catch (err) {
      setError('Gagal menghubungi server');
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
      <Container maxWidth="xs" style={{ padding: '40px, 0' }}>
        <StyledPaper>
          <img src={Logo} alt="Logo Pilmapres" style={{ width: '150px', marginBottom: '20px' }} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="NIM atau Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              error={!!error && !credential}
              helperText={!credential && error ? 'NIM atau Username harus diisi' : ''}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password}
              helperText={!password && error ? 'Password harus diisi' : ''}
            />
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
