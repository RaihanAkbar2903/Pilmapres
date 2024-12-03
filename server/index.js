const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");
const fileUpload = require("express-fileupload");
const registrasiRouter = require("./routes/registrasi");
const datapenggunaRouter = require("./routes/datapengguna");
const datapendafataran = require("./routes/datapendaftaran");
const jadwalpresentasi = require("./routes/jadwalpresentasi");
const jadwal = require("./routes/jadwal");
const banner = require("./routes/banner");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const capaian = require("./routes/capaian");
const migratePendaftaranRouter = require("./routes/migratePendaftaran");
const inovatif = require("./routes/inovatif");
const informasi = require("./routes/informasi");
const peserta = require("./routes/peserta");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({
  limits: {fileSize:  50 * 1024 * 1024 },
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/registrasi", registrasiRouter);
app.use("/datapengguna", datapenggunaRouter);
app.use("/datapendafataran", datapendafataran);
app.use("/jadwalpresentasi", jadwalpresentasi);
app.use("/jadwal", jadwal);
app.use("/banner", banner);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/migratePendaftaran", migratePendaftaranRouter);
app.use("/capaian", capaian);
app.use("/inovatif", inovatif);
app.use("/informasi", informasi);
app.use("/peserta", peserta);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
