const db = require("./connection");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Funzione per validare l'input
function validateInput(username, password) {
    if (!username || !password) {
        return { valid: false, message: 'Username e password sono obbligatori' };
    }
    if (username.length < 3 || username.length > 20) {
        return { valid: false, message: 'Username deve essere tra 3 e 20 caratteri' };
    }
    if (password.length < 8) {
        return { valid: false, message: 'La password deve essere almeno di 8 caratteri' };
    }
    return { valid: true };
}

async function login_register(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({
                success: false,
                message: "Metodo non supportato"
            });
        }

        const { username, password, type } = req.body;

        // Validazione input
        const validation = validateInput(username, password);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        if (type === 'register') {
            try {
                const rows = await db.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
                const userExists = rows[0];

                if (userExists) {
                    return res.status(409).json({
                        success: false,
                        message: "Username già in uso"
                    });
                }

                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const result = await db.query(
                    'INSERT INTO users(username, password) VALUES (?, ?)',
                    [username, hashedPassword]
                );

                //aggiunge i primi 500 crediti 

                await db.query('INSERT INTO user_credits(user_id,amount) VALUES(?,?',
                    [result.insertId,500]
                )
                return res.status(201).json({
                    success: true,
                    message: "Registrazione completata con successo",
                    userId: result.insertId
                });

            } catch (dbError) {
                console.error('Database error:', dbError);
                return res.status(500).json({
                    success: false,
                    message: 'Errore durante la registrazione'
                });
            }

        } else if (type === 'login') {
            try {
                console.log('Searching for user:', username.trim());

                // Versione corretta per il driver mysql standard
                const queryResult = await new Promise((resolve, reject) => {
                    db.query('SELECT * FROM users WHERE username = ? LIMIT 1',
                        [username.trim()],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        });
                });

                console.log('Query result:', queryResult);

                // Estrai l'utente - mysql standard restituisce un array di risultati
                const user = Array.isArray(queryResult) ? queryResult[0] : null;

                if (!user) {
                    // Debug: mostra tutti gli utenti (versione corretta per mysql)
                    const allUsers = await new Promise((resolve, reject) => {
                        db.query('SELECT username FROM users', (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        });
                    });

                    console.log('All users in DB:', allUsers);
                    return res.status(401).json({
                        success: false,
                        message: `Credenziali non valide (utenti esistenti: ${allUsers.map(u => u.username).join(', ')})`
                    });
                }

                if (!user.password) {
                    return res.status(500).json({
                        success: false,
                        message: 'Errore nel database: password mancante'
                    });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Password non valida'
                    });
                }
                
                //aggiornamento userState a on
                await db.query('UPDATE users SET userState = "on" WHERE id = ?', [user.id]);


                const { password: _, ...userWithoutPassword } = user;
                return res.json({
                    success: true,
                    message: "Login effettuato",
                    user: userWithoutPassword
                });

            } catch (dbError) {
                console.error('Database error:', dbError);
                return res.status(500).json({
                    success: false,
                    message: 'Errore durante il login'
                });
            }
        } else if(type ==='logout'){
// ****************************************
            try {
                const {userId}= req.body;

                if(!userId){
                    return res.status(400).json({
                        success:false,
                        message:'Id utente mancante per il logout'
                    })
                }

                await db.query('UPDATE users Set userState ="off" WHERE id = ?',[userId]);

                return res.json({
                    success:true,
                    message:"Logout effettuato con successo"
                })


            } catch (error) {
                        console.error('Database error during logout:', dbError);

            }
        }else {
            return res.status(400).json({
                success: false,
                message: 'Tipo di operazione non valida'
            });
        }
// ************************************************
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Errore interno del server'
        });
    }
}

module.exports = login_register;