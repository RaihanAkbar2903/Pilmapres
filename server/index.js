const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const registrasiRouter = require('./routes/registrasi');
const datapenggunaRouter = require('./routes/datapengguna');
const loginRouter = require('./routes/login'); 
const logoutRouter = require('./routes/logout');
const migratePendaftaranRouter = require('./routes/migratePendaftaran');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/registrasi', registrasiRouter);
app.use('/datapengguna', datapenggunaRouter);
app.use('/login', loginRouter); 
app.use('/logout', logoutRouter);
app.use('/migratePendaftaran', migratePendaftaranRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
