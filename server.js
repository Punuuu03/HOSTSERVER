// index.js (or your main app entry point)
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Rest of your API routes and server setup remains unchanged


app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name`=?, `Email`=? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
