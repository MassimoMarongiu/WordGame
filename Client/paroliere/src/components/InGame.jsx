import axios from "axios";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";  // Aggiungi useSelector
import "../styles/buttonStyle.css"

// import { add, resetLetters } from "../redux/lettersSlice";
import { add, resetLetters, addMultipleLetters } from "../redux/lettersSlice";

import MyCards from "./MyCards";
import CardsList from "./CardList";
import SelectedLetters from "./SelectedLetters";
import Credits from "./Credits";
import PrizeAmount from "./PrizeAmount";
import useUserState from "./UserState";
import { useNavigate } from "react-router-dom";
import "../styles/buttonStyle.css"

function InGame() {
    const userState = useUserState();
    const navigate = useNavigate();
    // const [letter, setLetter] = useState(null);
    const letters = useSelector((state) => state.letters.value);

    const dispatch = useDispatch();
    const [chosedLetter, setChosedLetter] = useState([]);
    const hasFetchedInitialLetters = useRef(false);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // gestione reindirizzamento se utente non loggato
    useEffect(() => {
        if (userState === null) {
            return;
        }
        if (userState !== 'on') {
            console.log("utente non autorizzato ");
        }
    }, [userState, navigate]);

    const protectedContainerStyle = {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        pointerEvents: 'none'
    };

    const cardlistSpace = {
        minHeight: "250px",
        height: "250px",
        border: "2px dashed #ccc solid",
        borderColor: "black",
        borderRadius: "8px",
        backgroundColor: "#175e0e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0",
        position: "relative",
        overflow: "auto"
    };

    const emptyStateStyle = {
        color: "#999",
        fontSize: "1.2rem",
        textAlign: "center",
        padding: "20px"
    };


    const fetchInitialLetters = async () => {
        try {
            // const response = await axios.post("http://localhost:3000/playGame", {
            const response = await axios.post("http://localhost:3000/playGame", {
                type: "mycard",
                count: 2
            });

            if (response.data.letters) {
                console.log("Lettere ricevute:", response.data.letters);
                // dispatchLetters(response.data.letters);
                // Invia tutte le lettere a Redux in una sola volta
                dispatch(addMultipleLetters(response.data.letters));
                setLoading(false);
            }
        } catch (error) {
            console.error("Errore:", error);
        }
    };

    useEffect(() => {
        if (!hasFetchedInitialLetters.current) {
            hasFetchedInitialLetters.current = true;
            fetchInitialLetters();
        }

        // Cleanup function
        return () => {
            // Resetta eventuali subscription o timer
        };
    }, []);

    const dispatchLetters = (lettersArray) => {
        lettersArray.forEach(letterObj => {
            if (letterObj.id) {
                dispatch(add(letterObj));
                setLetter(letterObj.value);
            } else {
                console.error("Lettera senza ID:", letterObj);
            }
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getPriceAmount = async () => {
            try {
                const response = await axios.get('http://localhost:3000/credits');
                const data = await response.json();

            } catch (error) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        }

    })

    async function handleConsonantClick() {
        try {
            if (isLoading) return;
            setIsLoading(true);

            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.id) throw new Error('Utente non loggato');

            // Prima chiamata: verifica/aggiorna crediti
            const creditResponse = await axios.post("http://localhost:3000/credits", {
                type: "consonant",
                userId: user.id
            });

            if (creditResponse.data.error) {
                throw new Error(creditResponse.data.error);
            }

            console.log("Crediti aggiornati:", creditResponse.data);
            console.log("Montepremi attuale:", creditResponse.data.currentAmount);

            // Forza l'aggiornamento immediato invece di aspettare il refresh
            setRefreshTrigger(prev => {
                const newValue = prev + 1;
                console.log("Refresh trigger updated to:", newValue);
                return newValue;
            });

            // Seconda chiamata: ottieni la lettera
            const response = await axios.post("http://localhost:3000/playGame", {
                type: "consonant"
            });
            console.log("Lettera ricevuta dal backend:", response.data);  // Controlla il formato

            dispatch(add(response.data.letter));

        } catch (error) {
            console.error("Errore:", error);
            alert(error.message || "Errore durante la richiesta");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleVocalClick() {
        try {
            if (isLoading) return;
            setIsLoading(true);

            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.id) throw new Error('Utente non loggato');

            // Prima chiamata: verifica/aggiorna crediti
            const creditResponse = await axios.post("http://localhost:3000/credits", {
                type: "vowel",
                userId: user.id
            });

            if (creditResponse.data.error) {
                throw new Error(creditResponse.data.error);
            }

            console.log("Crediti aggiornati:", creditResponse.data);

            // Forza l'aggiornamento immediato invece di aspettare il refresh
            setRefreshTrigger(prev => {
                const newValue = prev + 1;
                console.log("Refresh trigger updated to:", newValue);
                return newValue;
            });

            // Seconda chiamata: ottieni la lettera
            const response = await axios.post("http://localhost:3000/playGame", {
                type: "vowel"
            });

            dispatch(add(response.data.letter));

        } catch (error) {
            console.error("Errore:", error);
            alert(error.message || "Errore durante la richiesta");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResetGame() {
        try {
            //  Reset sul server
            const resetResponse = await axios.post("http://localhost:3000/playGame", {
                type: "reset"
            });


            //reset montepremi
            await axios.post("http://localhost:3000/resetPrizeMoney");

            //  Reset nello stato Redux
            dispatch(resetLetters());

            // Reset negli stati locali
            // setLetter(null);
            setChosedLetter([]);
            hasFetchedInitialLetters.current = false;

            //  Forza l'aggiornamento dei componenti
            setRefreshTrigger(prev => prev + 1);

            //  Ricarica le lettere iniziali
            // await fetchInitialLetters();

            // console.log("Reset completato con successo");

            // if (!resetResponse.data.success) {
            //     throw new Error("Il server non ha confermato il reset");
            // }
            navigate('/');
        } catch (error) {
            console.error("Errore durante il reset:", error);
        }
    }

    return (
        <div>
   

            {userState === 'on' ? (
                <>
                    <div><Credits refreshTrigger={refreshTrigger} /></div>
                    <div><PrizeAmount refreshTrigger={refreshTrigger} /></div>

                    <div style={cardlistSpace}>
                        {letters.length > 0 ? (
                            <CardsList />  // Non passare props, usa direttamente useSelector in CardsList
                        ) : (
                            <div style={emptyStateStyle}>Nessuna lettera disponibile</div>
                        )}
                    </div>
                    <div>

                        <Button
                            id="consonant"
                            buttonName="Consonant  (-5 monete)"
                            onClick={handleConsonantClick}
                        />
                        <Button
                            id="vocal"
                            buttonName="Vocal (-10 monete)"
                            onClick={handleVocalClick}
                        />
                        <button class="playButtonStyle">Fold</button>
                    </div>

                    <div>
                        <MyCards loading={loading} />
                    </div>
                    <button class="playButtonStyle">Conferma</button>
                    {/* icona tempo e tempo */}
                    <SelectedLetters />

                </>
            ) : (
                <div>Verifica dello stato dell'utente in corso...</div>
            )}
         <Button
                id="reset"
                buttonName="ESCI"
                onClick={handleResetGame}
            />
        </div>

    );
}

export default InGame;