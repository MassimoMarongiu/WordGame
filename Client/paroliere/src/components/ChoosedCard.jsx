import React, { useEffect, useState } from "react";
function ChoosedCard({ letter }){
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    if (letter && letters.length<6) {
      setLetters(prev => [...prev, letter]);
    }
  }, [letter]);

  function handleDeleteLetter(letter){
    
  }

  return (
    <div className="cards-container">
      {letters.map((letter, index) => (
        <Card key={`${letter}-${index}`} letter={letter} onClick={() => handleDeleteLetter(letter)} />))}   
    </div>
  );
};

export default ChoosedCard;