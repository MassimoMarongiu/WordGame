import CardsList from "../components/CardList";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import InGame from "../components/InGame";
import Credits from "../components/Credits";
import useUserState from "../components/UserState";
import { useNavigate } from "react-router-dom";

function PlayGame() {
  const [gameState, setGameState] = useState("homeGame");
  const userState = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if(userState===null) return;

    if(userState !== 'on'){
      navigate('/login_register')
    }
  }, [userState,navigate]);

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Credits/>
        <Button
          buttonName="START"
          onClick={handlesetGame}
           disabled={userState !== 'on'}
        />
      </div>
    );
  }

  if (gameState === "inGame") {
    // return <CardsList />;
    return (
      <div>
        <InGame/>
      </div>
    )
  }

  return null;
}

export default PlayGame;
