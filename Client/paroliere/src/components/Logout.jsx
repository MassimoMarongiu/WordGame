import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.id) {
                    // Imposta lo stato dell'utente a "off"
                    await axios.post('http://localhost:3000/logout', {
                        userId: user.id
                    });
                }

                // Rimuovi i dati dell'utente dal localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('userState');

                // Reindirizza alla pagina di login dopo 2 secondi
                setTimeout(() => {
                    navigate('/');
                }, 5000);
                // Reindirizza immediatamente alla home
                // navigate('/');

            } catch (error) {
                console.error('Errore durante il logout:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <>
            <h1>Logout avvenuto con successo</h1>
            <h1>ritorna presto a trovarci</h1>
        </>
    );
}

export default Logout;