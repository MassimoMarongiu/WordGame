import { useSelector, useDispatch } from "react-redux";
import { removeSelected } from "../redux/lettersSlice";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { resetAllSelectedLetters } from "../redux/lettersSlice";

function SelectedLetters() {

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
        width: '100%',
        gap: '3px',
        padding: '5px',
        boxSizing: 'border-box',
        justifyItems: 'center'
    };

    const getCardStyle = (isValidWord) => ({
        aspectRatio: '0.6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'clamp(24px, 4vw, 36px)',
        fontWeight: 'bold',
        background: isValidWord ? '#4CAF50' : '#3c38b1', // Verde se valida, blu altrimenti
        border: '2px solid #ccc',
        borderRadius: '8px',
        color: "white",
        width: '90%',
        maxWidth: '90px',
        minHeight: '120px',
        cursor: 'pointer',
        transition: 'background 0.3s ease' // Aggiungi transizione per un effetto più fluido
    });

    const emptyStateStyle = {
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
        gridColumn: '1 / -1'
    };

    const [isValidWord, setIsValidWord] = useState(false);

    const selectedLetters = useSelector((state) => state.letters?.selectedLetters || []);
    const dispatch = useDispatch();

    const verifyWords = async () => {
        if (selectedLetters.length === 0) {
            setIsValidWord(false);
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/playGame", {
                type: "verifyWords",
                letters: selectedLetters.map(l => l.value)
            });

            if (response.data.isValid) {
                console.log("Parola valida:", response.data.word);
                setIsValidWord(true);
            } else {
                console.log("Nessuna parola valida trovata");
                setIsValidWord(false);
            }
        } catch (error) {
            console.error("Errore nella verifica:", error.response?.data || error.message);
        }
    }

    const handleRemove = (letterId) => {
        dispatch(removeSelected(letterId));
    };

    const resetChoosedLetter = () => {
        dispatch(resetAllSelectedLetters());
        setIsValidWord(false);
    }
    useEffect(() => {
        verifyWords();
    }, [selectedLetters]);


    return (
        <div>
            <div style={containerStyle}>
                {selectedLetters.length > 0 ? (
                    selectedLetters.map((letter) => (
                        <div
                            key={letter.id}
                            style={getCardStyle(isValidWord)}
                            onClick={() => handleRemove(letter.id)}
                        >
                            {letter.value}
                        </div>
                    ))
                ) : (
                    <p style={emptyStateStyle}>
                        Nessuna lettera selezionata. Clicca su una lettera per aggiungerla qui.
                    </p>
                )}
            </div>
            <div>
                <button onClick={resetChoosedLetter}>CANCELLA</button>
            </div>
        </div>

    );
}

export default SelectedLetters;
