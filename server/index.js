const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");
const fileUpload = require("express-fileupload");
const registrasiRouter = require("./routes/registrasi");
const datapenggunaRouter = require("./routes/datapengguna");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const capaian = require("./routes/capaian");
const migratePendaftaranRouter = require("./routes/migratePendaftaran");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/registrasi", registrasiRouter);
app.use("/datapengguna", datapenggunaRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/migratePendaftaran", migratePendaftaranRouter);
app.use("/capaian", capaian);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
