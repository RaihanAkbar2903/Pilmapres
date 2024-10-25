import React, { useState } from 'react';
import { 
  Box, Button, Grid, TextField, MenuItem, Paper
} from '@mui/material';
import { styled } from '@mui/system';
import Logo from './assets/images/logopilmapres.png';
import Background from './assets/images/backgroundpilmapres.jpg';

// Styled Component for Paper (Form Container)
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

function Registrasi() {
  // State untuk mengelola input form dan error
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nim: '',
    username: '',
    password: '',
    tempat: '',
    tanggalLahir: '',
    jenisKelamin: '',
    noHp: '',
    email: '',
    jurusan: '',
    prodi: '',
    programPendidikan: '',
    foto: ''
  });
  const [errors, setErrors] = useState({});

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk validasi input form
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Field ini harus diisi';
      }
    });
    return newErrors;
  };

  // Fungsi untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Lakukan sesuatu ketika form valid
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        padding: '50px 0',
      }}
    >
      <StyledPaper elevation={3} sx={{ maxWidth: 520, width: '100%', height: 'auto' }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <img 
            src={Logo} 
            alt="Logo Pilmapres" 
            style={{ width: '150px'}} 
          />
        </Box>

        {/* Formulir Pendaftaran */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nama Lengkap"
                name="namaLengkap"
                fullWidth
                variant="outlined"
                value={formData.namaLengkap}
                onChange={handleChange}
                error={!!errors.namaLengkap}
                helperText={errors.namaLengkap}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="No. Induk Mahasiswa"
                name="nim"
                fullWidth
                variant="outlined"
                value={formData.nim}
                onChange={handleChange}
                error={!!errors.nim}
                helperText={errors.nim}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                fullWidth
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tempat"
                name="tempat"
                fullWidth
                variant="outlined"
                value={formData.tempat}
                onChange={handleChange}
                error={!!errors.tempat}
                helperText={errors.tempat}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tanggal Lahir"
                name="tanggalLahir"
                fullWidth
                variant="outlined"
                type="date"
                InputLabelProps={{
                shrink: true, 
                }}
                value={formData.tanggalLahir}
                onChange={handleChange}
                error={!!errors.tanggalLahir}
                helperText={errors.tanggalLahir}
                />
            </Grid> 
            <Grid item xs={4}>
              <TextField 
                label="Jenis Kelamin" 
                name="jenisKelamin"
                select 
                fullWidth 
                variant="outlined"
                value={formData.jenisKelamin}
                onChange={handleChange}
                error={!!errors.jenisKelamin}
                helperText={errors.jenisKelamin}
              >
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="No. Handphone"
                name="noHp"
                fullWidth
                variant="outlined"
                value={formData.noHp}
                onChange={handleChange}
                error={!!errors.noHp}
                helperText={errors.noHp}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Jurusan"
                name="jurusan"
                fullWidth
                variant="outlined"
                value={formData.jurusan}
                onChange={handleChange}
                error={!!errors.jurusan}
                helperText={errors.jurusan}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Prodi"
                name="prodi"
                fullWidth
                variant="outlined"
                value={formData.prodi}
                onChange={handleChange}
                error={!!errors.prodi}
                helperText={errors.prodi}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Program Pendidikan"
                name="programPendidikan"
                select 
                fullWidth 
                variant="outlined"
                value={formData.programPendidikan}
                onChange={handleChange}
                error={!!errors.programPendidikan}
                helperText={errors.programPendidikan}
              >
                <MenuItem value="D3">D3</MenuItem>
                <MenuItem value="D4">D4</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Upload Foto"
                name="foto"
                fullWidth
                variant="outlined"
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                error={!!errors.foto}
                helperText={errors.foto}
              />
            </Grid>

            {/* Tombol Daftar */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" sx={{ width: '100%', backgroundColor: '#003366' }}>
                Daftar
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Box>
  );
}

export default Registrasi;
