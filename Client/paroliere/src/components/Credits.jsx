import { useEffect, useState } from "react";

function Credits({ refreshTrigger }) {
    const [credits, setCredits] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const styles = {
        creditsContainer: {
           display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: '1rem',
            border: '1px solid #4a4a4a',
            borderRadius: '8px',    
             fontSize: '3rem',    
             alignItem:"center",
              color: ' #FFD700'
        },
        creditsAmount: {
         
            fontWeight: 'bold',
            color: '#ffd700'
        },
           titleCredits: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
           
        }
    };

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user?.id) throw new Error('Utente non loggato');

                const response = await fetch(`http://localhost:3000/credits?userId=${user.id}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.details || errorData.error || 'Errore nel recupero dei crediti');
                }

                const data = await response.json();
                setCredits(data.amount || 0);
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCredits();
    }, [refreshTrigger]);  

    if (loading) return <div>Caricamento monete...</div>;
    if (error) return <div className="error-message">Errore: {error}</div>;

    return (
        <div style={styles.creditsContainer}>
            <div><h3 styles={styles.titleCredits}>Monete disponibili:</h3></div>
            <div><h3 style={styles.creditsAmount}>{credits}</h3></div>
        </div>
    );
}

export default Credits;