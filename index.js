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

app.use(express.json());

//get
app.get('/api/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata');

        res.status(200).json({
            status: 'success',
            pesan: 'Berhasil mengambil data biodata',
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Terjadi kesalahan pada server atau database' });
    }
});

//post
app.post('/api/biodata', async (req, res) => {
    try {
        // Menerima nama, nim, dan kelas dari request body
        const { nama, nim, kelas } = req.body; 
        
        const result = await pool.query(
            'INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *',
            [nama, nim, kelas]
        );

        res.status(201).json({
            status: 'success',
            pesan: 'Data biodata berhasil ditambahkan',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data' });
    }
});

//put
app.put('/api/biodata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, kelas } = req.body; // Menerima data perubahan

        const result = await pool.query(
            'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *',
            [nama, nim, kelas, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Data dengan ID ${id} tidak ditemukan` });
        }

        res.status(200).json({
            status: 'success',
            pesan: 'Data biodata berhasil diperbarui',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});