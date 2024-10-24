import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landingpage'
import Login from './login';
import DashboardMahasiswa from './dashboardmahasiswa';
import BerkasCU from './berkascu';
import BerkasPI from './berkaspi';
import Jadwal from './jadwal';
import Hasil from './hasil';
import Registrasi from './registrasi';
import DashboardAdmin from './dashboardadmin';
import DataPengguna from './datapengguna';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/dashboardmahasiswa" element={<DashboardMahasiswa />} ></Route>
          <Route path="/berkascu" element={<BerkasCU />} ></Route>
          <Route path="/berkaspi" element={<BerkasPI />} ></Route>
          <Route path="/jadwal" element={<Jadwal />} ></Route>
          <Route path="/hasil" element={<Hasil />} ></Route>
          <Route path="/registrasi" element={<Registrasi />} ></Route>
          <Route path="/dashboardadmin" element={<DashboardAdmin />} ></Route>
          <Route path="/datapengguna" element={<DataPengguna />} ></Route>
        </Routes>
      </Router>
  );
}

export default App;
