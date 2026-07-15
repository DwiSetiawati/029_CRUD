const express = require('express');
const {Pool} = require('pg');
const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Dwisetwa27',
    port: 5432,
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});