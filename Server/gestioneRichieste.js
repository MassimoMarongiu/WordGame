// gestioneRichieste.js
"use strict";

const path = require('path');

const express = require('express');

const usersManagment = require("./usersManagment");
const login_register = require('./login_register');
const playGame = require("./playGame");
const credits = require('./credits');
const getUserState = require('./userState');
const logout = require('./logout'); 

// const main = require('./main');
const { getPrizeMoney, resetPrizeMoney } = require('./prizePool');
const router = express.Router();

// router.get('/');
router.get('/', (req, res) => {
res.sendFile('D:/Programmazione/WordGame/Client/paroliere/dist/index.html');
});

router.get("/usersList", usersManagment);
router.post("/playGame", playGame);
router.post("/login_register", login_register);
router.get("/credits", credits);
router.post("/credits", credits);
router.get("/userState", getUserState);
router.post("/logout", logout);

router.get("/prizeMoney", (req, res) => {
    try {
        const currentPrize = getPrizeMoney();
        console.log("Sending prize money to client:", currentPrize); // Debug log
        res.status(200).json({ amount: currentPrize });
    } catch (err) {
        console.error('Errore nel recupero del montepremi:', err);
        res.status(500).json({ error: "Errore nel recupero del montepremi" });
    }
});

router.post("/resetPrizeMoney", (req, res) => {
    try {
        resetPrizeMoney();
        res.status(200).json({ success: true, message: "Montepremi azzerato" });
    } catch (err) {
        console.error('Errore nel reset del montepremi:', err);
        res.status(500).json({ error: "Errore nel reset del montepremi" });
    }
});


// router.get("/test", (req, res) => {
//   res.status(200).json({ message: "Connessione riuscita!" });
// });



module.exports = router;