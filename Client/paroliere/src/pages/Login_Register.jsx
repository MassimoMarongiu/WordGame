import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login_Register() {

    const [showRegister, setShowRegister] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loginregisterStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        maxWidth: "300px",
        margin: "0 auto"
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px"
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            setMessage('Le password non coincidono');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login_register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    type: "register"
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                // Mostra il messaggio specifico dal backend
                throw new Error(data.message || 'Errore durante la registrazione');
            }

            // Aggiungi questo nello style per i messaggi di errore:
            const errorStyle = {
                color: 'red',
                margin: '10px 0'
            };


            if (data.success) {
                setMessage('Registrazione completata! Ora puoi accedere.');
                setShowRegister(false);
            } else {
                setMessage(data.message || 'Errore durante la registrazione');
            }
        } catch (error) {
            setMessage('Errore di connessione');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            console.log('Tentativo di login con:', { username }); // Log per debug

            const response = await fetch('http://localhost:3000/login_register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    type: "login"
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Se il server risponde con un errore (incluso 401)
                throw new Error(data.message || `Errore durante il login (status ${response.status})`);
            }

            // Se tutto va bene
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');

        } catch (error) {
            setMessage(error.message);
            console.error('Errore durante il login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={loginregisterStyle}>
            {message && <div style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</div>}
            {showRegister ? (
                <>
                    <h1>Registrati</h1>
                    <form style={formStyle} onSubmit={handleRegister}>
                        <label htmlFor="registerUsername">Username</label>
                        <input type="text" id="registerUsername" required />
                        <label htmlFor="registerPassword">Password</label>
                        <input type="password" id="registerPassword" required />
                        <label htmlFor="registerConfirmPassword">Conferma Password</label>
                        <input type="password" id="registerConfirmPassword" required />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Caricamento...' : 'Registrati'}
                        </button>
                    </form>
                    <p>Hai già un account? <button onClick={() => setShowRegister(false)}>Accedi</button></p>
                </>
            ) : (
                <>
                    <h1>Accedi</h1>
                    <form style={formStyle} onSubmit={handleLogin}>
                        <label htmlFor="loginUsername">Username</label>
                        <input type="text" id="loginUsername" required />
                        <label htmlFor="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Caricamento...' : 'Accedi'}
                        </button>
                    </form>
                    <p>Non hai un account? <button onClick={() => setShowRegister(true)}>Registrati</button></p>
                </>
            )}
        </div>
    );
}

export default Login_Register;