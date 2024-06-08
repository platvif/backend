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

// Ruta para actualizar la información del usuario
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastname, mail, phone, favorite_res, emoji, selfie, cover, location } = req.body;
    
    if (!id) {
        return res.status(400).send('User ID is required');
    }

    const query = `UPDATE users SET 
                    name = ?, 
                    lastname = ?, 
                    mail = ?, 
                    phone = ?, 
                    favorite_res = ?, 
                    emoji = ?, 
                    selfie = ?, 
                    cover = ?, 
                    location = ? 
                   WHERE id = ?`;

    db.run(query, [name, lastname, mail, phone, favorite_res, emoji, selfie, cover, location, id], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send({ message: 'User updated successfully', changes: this.changes });
    });
});

// Nueva ruta para obtener todos los usuarios registrados
router.get('/all', (req, res) => {
    const query = `SELECT * FROM users`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;