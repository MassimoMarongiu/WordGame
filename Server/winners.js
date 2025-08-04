const { getPrizeMoney, resetPrizeMoney } = require('./prizePool');
const db = require('./connection'); // Assumendo che ti serva

async function assignPrize(userId) {
    const currentPrize = getPrizeMoney();
    
    if (currentPrize > 0 && userId) {
        try {
            // 1. Aggiungi i crediti all'utente
            await db.query(
                'UPDATE user_credits SET amount = amount + ? WHERE user_id = ?',
                [currentPrize, userId]
            );
            
            // 2. Resetta il montepremi
            resetPrizeMoney();
            
            console.log(`Assegnati ${currentPrize} crediti all'utente ${userId}`);
            return true;
        } catch (err) {
            console.error('Errore nell\'assegnazione del premio:', err);
            return false;
        }
    }
    return false;
}

module.exports = {
    assignPrize
};