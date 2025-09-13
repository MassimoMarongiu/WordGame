import CardsList from "../components/CardList";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import InGame from "../components/InGame";
import Credits from "../components/Credits";
import useUserState from "../components/UserState";
import { useNavigate } from "react-router-dom";
import "../styles/buttonStyle.css"
import "../styles/playGame.css"; // Importa il nuovo file CSS

function PlayGame() {
  const [gameState, setGameState] = useState("homeGame");
  const userState = useUserState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userState === null) return;

    if (userState !== 'on') {
      navigate('/login_register')
    }
  }, [userState, navigate]);

  function handlesetGame() {
    if (userState !== 'on') {
      navigate('/login_register');
      return;
    }
    console.log("Changing game state to inGame");
    setGameState("inGame");
  }

  if (gameState === "homeGame") {
    return (
      <div className="playgame-container">
        <div className="playgame-content">
          <h1 className="playgame-username">{user.username}</h1>
          <Credits />
          <Button
            class="playButtonStyle"
            buttonName="START"
            onClick={handlesetGame}
            disabled={userState !== 'on'}
          />
        </div>
      </div>
    );
  }

  if (gameState === "inGame") {
    return (
      <div className="playgame-container">
        <InGame />
      </div>
    )
  }

  return null;
}

export default PlayGame;