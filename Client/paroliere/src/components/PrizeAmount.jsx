import { useEffect, useState } from "react";

function PrizeAmount({ refreshTrigger }) {
    const [prizeAmount, setPrizeAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const styles = {
        prizeContainer: {
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: '1rem',
            border: '1px solid #4a4a4a',
            borderRadius: '8px',
            margin: '1rem 0',
            backgroundColor: '#2a2a2a',
        },
        prizeAmountStyle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffd700'
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffffff'
        }
    };

    useEffect(() => {
        const fetchPrizeAmount = async () => {
            try {
                const response = await fetch('http://localhost:3000/prizeMoney');

                if (!response.ok) {
                    throw new Error('Errore nel recupero del montepremi');
                }

                const data = await response.json();
                console.log("Received prize money:", data.amount); // Debug log

                setPrizeAmount(data.amount || 0);
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrizeAmount();
    }, [refreshTrigger]);

    if (loading) return <div>Caricamento montepremi...</div>;
    if (error) return <div className="error-message">Errore: {error}</div>;

    return (
        <div style={styles.prizeContainer}>
            <div ><h3 style={styles.title}>Montepremi:</h3></div>
            <div ><h3 style={styles.prizeAmountStyle}>{prizeAmount} </h3></div>
        </div>
    );
}

export default PrizeAmount;