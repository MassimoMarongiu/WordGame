const db = require('./connection');

async function logout(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ 
                success: false,
                error: "userId mancante" 
            });
        }

        const result = await db.query('UPDATE users SET userState = "off" WHERE id = ?', [userId]);
        

        const affectedRows = Array.isArray(result) ? result[0].affectedRows : result.affectedRows;

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: "Utente non trovato"
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Logout effettuato con successo" 
        });
    } catch (err) {
        console.error('Errore durante il logout:', err);
        res.status(500).json({ 
            success: false,
            error: "Errore interno del server" 
        });
    }
}

module.exports = logout;