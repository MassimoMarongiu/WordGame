const db = require("./connection");

async function getUserState(req, res) {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "userId mancante" });
        }

        // Modifica qui: aggiungi una callback per gestire il risultato
        db.query('SELECT userState FROM users WHERE id = ?', [userId], (error, results, fields) => {
            if (error) {
                console.error('Errore query:', error);
                return res.status(500).json({ error: "Errore del database" });
            }

            console.log('Risultati:', results); // Debug aggiuntivo

            if (!results || results.length === 0) {
                return res.status(404).json({ error: "Utente non trovato" });
            }

            res.status(200).json({ userState: results[0].userState });
        });

    } catch (err) {
        console.error('Errore durante il recupero dello stato:', err);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

module.exports = getUserState;