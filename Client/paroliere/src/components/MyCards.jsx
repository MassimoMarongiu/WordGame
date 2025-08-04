import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { select } from "../redux/lettersSlice";

function MyCards({loading}) {

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))', // Aumentato da 50px a 75px (+50%)
        width: '100%',
        gap: '3px',
        padding: '5px',
        boxSizing: 'border-box',
        justifyItems: 'center'
    };

    const cardStyle = {
        aspectRatio: '0.6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'clamp(24px, 4vw, 36px)',
        fontWeight: 'bold',
        background: 'white',
        border: '2px solid #ccc',
        borderRadius: '8px',
        color: "black",
        width: '90%',
        maxWidth: '90px',
        minHeight: '120px'
    };

    const emptyStateStyle = {
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
        gridColumn: '1 / -1'
    };

    const myLetters = useSelector((state) => state.letters?.value || []);
    const dispatch = useDispatch();

    const choosed = (letter) => {
        console.log("Carta scelta:", letter);
        dispatch(select(letter.id));
    };


    return (
        <div style={containerStyle}>
            {myLetters.length > 0 ? (
                myLetters.slice(0, 2).map((letter, index) => {
                    if (!letter.id) {
                        console.error("Lettera senza ID:", letter);
                        return null;
                    }
                    return (
                        <div
                            key={letter.id || `temp-${index}`}
                            style={{ ...cardStyle, cursor: 'pointer' }}
                            onClick={() => choosed(letter)}
                        >
                            {letter.value}
                        </div>
                    );
                })
            ) : (
                <p style={emptyStateStyle}>
                     {loading ? "Caricamento..." : "Nessuna lettera disponibile"}
                </p>
            )}
        </div>
    );
}

export default MyCards;