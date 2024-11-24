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
import BerkasAdminCU from './berkasadmincu';
import JadwalPresentasi from './jadwalpresentasi';
import Banner from './banner';
import Informasi from './informasi';
import JadwalPilmapres from './jadwalpilmapres';
import ProtectedRoute from './ProtectedRoute';
import DashboardJuri from './dashboardjuri';
import Peserta from './peserta';
import BerkasJuri from './berkasjuri';
import PresentasiJuri from './presentasijuri';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/registrasi" element={<Registrasi />} ></Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboardmahasiswa" element={<DashboardMahasiswa />} ></Route>
            <Route path="/berkascu" element={<BerkasCU />} ></Route>
            <Route path="/berkaspi" element={<BerkasPI />} ></Route>
            <Route path="/jadwal" element={<Jadwal />} ></Route>
            <Route path="/hasil" element={<Hasil />} ></Route>
            <Route path="/banner" element={<Banner />} ></Route>
            <Route path="/informasi" element={<Informasi />} ></Route>
            <Route path="/jadwalpilmapres" element={<JadwalPilmapres />} ></Route>
            <Route path="/dashboardadmin" element={<DashboardAdmin />} ></Route>
            <Route path="/datapengguna" element={<DataPengguna />} ></Route>
            <Route path="/berkasadmincu" element={<BerkasAdminCU />} ></Route>
            <Route path="/jadwalpresentasi" element={<JadwalPresentasi />} ></Route>
            <Route path="/dashboardjuri" element={<DashboardJuri />} ></Route>
            <Route path="/peserta" element={<Peserta />} ></Route>
            <Route path="/berkasjuri" element={<BerkasJuri />} ></Route>
            <Route path="/presentasijuri" element={<PresentasiJuri />} ></Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
