import CardsList from "./CardList";
import Button from "./Button";
import { useState, useEffect } from "react";
import InGame from "./InGame";
import Credits from "./Credits";
import { Link } from "react-router-dom";
import useUserState from "./UserState"
import "../styles/buttonStyle.css"

function MainComponent() {

    const userState = useUserState();

    const style = {
        display: "flex",
        flexDirection: "row",
        color: "blue",
        gap: "10px",
        listStyle: "none",
        padding: "20px",
        backgroundColor: "#f0f0f0"
    }

    return (
        <div>
            {userState === 'on' ? (
                <div>
                    {/* <Link to="/usersList" style={linkStyle}>Users List</Link> */}
                    <Link to="/playGame" class="playButtonStyle">PLAY</Link>
                </div>
            ) : (
                <Link to="/login_register" class="playButtonStyle">Login/Register</Link>
            )}
        </div>
    )
}

export default MainComponent;