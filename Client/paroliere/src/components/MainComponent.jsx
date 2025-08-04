import CardsList from "./CardList";
import Button from "./Button";
import { useState, useEffect } from "react";
import InGame from "./InGame";
import Credits from "./Credits";
import { Link } from "react-router-dom";
import useUserState from "./UserState"
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

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        padding: "8px 12px",
        borderRadius: "4px",
        transition: "background-color 0.3s",
        ':hover': {
            backgroundColor: "#e0e0e0"
        }
    }
    // console.log("userState " + userState);
    return (
        <div>
            {userState === 'on' ? (
                <div>
                    <Link to="/usersList" style={linkStyle}>Users List</Link>
                    <Link to="/playGame" style={linkStyle}>PLAY</Link>
                </div>
            ) : (
                <Link to="/login_register" style={linkStyle}>Login/Register</Link>
            )}
        </div>
    )
}

export default MainComponent;