import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useUserState() {
    const [userState, setUserState] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const checkUserState = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                
                // Se non c'è utente, reindirizza al login
                if (!user?.id) {
                    navigate('/login_register');
                    return;
                }
                
                // Se lo stato è già salvato in localStorage, usalo
                if(localStorage.getItem('userState') === 'on') {
                    setUserState('on');
                    return;
                }

                // Altrimenti, verifica con il server
                const response = await axios.get(`http://localhost:3000/userState?userId=${user.id}`);
                
                if (response.data.userState !== 'on') {
                    alert('Devi essere loggato per giocare');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userState');
                    // navigate('/login_register');
                } else {
                    localStorage.setItem('userState', 'on');
                    setUserState('on');
                
                }
            } catch (error) {
                console.error('Errore durante il controllo dello stato:', error);
                navigate('/login_register');
            }
        };

        checkUserState();
    }, []);

    return userState;
}

export default useUserState;