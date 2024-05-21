const express = require('express');

const router = express.Router();

const db = require('../db');

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    const { name, lastname, mail, pass } = req.body;

    const query = `INSERT INTO users (name, lastname, mail, pass, phone, favorite_res, emoji, selfie, cover, location) 
                   VALUES (?, ?, ?, ?, '', '', '', '', '', '')`;

    db.run(query, [name, lastname, mail, pass], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

// Ruta para loguear un usuario
router.post('/login', (req, res) => {
    const { mail, pass } = req.body;

    const query = `SELECT * FROM users WHERE mail = ? AND pass = ?`;

    db.get(query, [mail, pass], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar usuario' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
        res.status(200).json(row);
    });
});

module.exports = router;