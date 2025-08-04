"use strict";

const mysql = require("mysql");
// http://localhost:3000


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "paroliere"
});

db.connect((err) => {
    if (err) {
        console.error("Errore di connessione al database:", err.message);
        process.exit(1);
    }
    console.log("Connesso al database MySQL");
});

process.on("SIGINT", () => {
    db.end((err) => {
        if (err) {
            console.error("Errore durante la chiusura del database:", err.message);
        }
        console.log("Connessione al database chiusa.");
        process.exit(0);
    });
});


module.exports = db;