import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { select } from "../redux/lettersSlice";

const CardsList = () => {
  
const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
  width: '100%',
  gap: '3px',
  padding: '5px',
  boxSizing: 'border-box',
  justifyItems: 'center',
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

  const letters = useSelector((state) => state.letters?.value || []);
  const dispatch = useDispatch();
  
  const choosed = (letter) => {
    console.log("Carta scelta:", letter);
    dispatch(select(letter.id));
    if(letter.selected === true){
      cardStyle.background ="red"
    }
  };

  return (
    <div style={containerStyle}>
      {letters.length > 0 ? (
        letters.slice(2, 10).map((letter) => (  
        <div key={letter.id}
            style={{...cardStyle, cursor: 'pointer'}}
            onClick={()=>choosed(letter)} 
         >
            {letter.value}
          </div>
        ))
      ) : (
        <p style={emptyStateStyle}>
          Nessuna lettera. Clicca su "Consonant" o "Vocal" per iniziare.
        </p>
      )}
    </div>
  );
};

export default CardsList;