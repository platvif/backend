// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        mail TEXT NOT NULL UNIQUE,
        pass TEXT NOT NULL,
        phone TEXT,
        favorite_res TEXT,
        emoji TEXT,
        selfie TEXT,
        cover TEXT,
        location TEXT
    )`);
});

module.exports = db;
