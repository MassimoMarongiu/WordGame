"use strict";

const db = require('./connection.js');

const path = require('path');  
const gestioneRichieste = require("./gestioneRichieste");
const express = require('express');
const cors = require('cors');
const app = express();
// const path = require('path');
// const fs = require('fs');

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] ,
  credentials: true
}));

app.use(express.static(path.join(__dirname, '../Client/paroliere/dist')));

// app.use(gestioneRichieste);
app.use('/', gestioneRichieste);


// app.use((req, res) => {
//   console.log('Richiesta non gestita:', req.method, req.url);
//   res.status(404).json({ 
//     error: "Endpoint non trovato",
//     tried: `${req.method} ${req.url}`,
//     availableEndpoints: [
//       "GET /prizeMoney",
//       "POST /resetPrizeMoney",
//       "GET /test",
//       "GET /",
//     ]
//   });
// });

// const server = app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

// Aggiungi QUESTO blocco per abilitare connessioni esterne:
const PORT = 3000;
const HOST = '0.0.0.0'; // Ascolta su tutte le interfacce di rete

const os = require('os');

function getLocalIPs() {
    const interfaces = os.networkInterfaces();
    const ips = [];

    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            // Ignora indirizzi IPv6 e quelli non interni
            if (iface.family === 'IPv4' && !iface.internal) {
                ips.push({
                    interface: interfaceName,
                    address: iface.address,
                    netmask: iface.netmask
                });
            }
        }
    }

    return ips;
}

const localIPs = getLocalIPs();

// Stampa tutti gli IP trovati
console.log('Indirizzi IP disponibili:');
localIPs.forEach(ip => {
    console.log(`- ${ip.interface}: ${ip.address}`);
});

// Prendi il primo IP disponibile (di solito quello corretto)
const mainIP = localIPs.length > 0 ? localIPs[0].address : 'localhost';


const server = app.listen(PORT, HOST, () => {
  const address = server.address();
  console.log(`Server in ascolto su http://${address.address}:${address.port}`);
  console.log(`Accessibile localmente su http://localhost:${PORT}`);
  console.log(`Accessibile in rete su http://${mainIP}:${PORT}`);
});



server.timeout = 0;
