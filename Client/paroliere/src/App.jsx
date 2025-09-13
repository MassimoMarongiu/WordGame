import { useState, useEffect } from 'react';
// import UserList from './components/Users.jsx';
import { Link } from "react-router-dom";
import MainComponent from './components/MainComponent'
import Nav from './components/Nav';
import useUserState from './components/UserState';
function App() {
  const userState = useUserState();
  const mainStyle = {
    top: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1000,
    fontSize: 200
  };

  const navStyle = {
    flexDirection: "column",
    backgroundColor: "blue",
    color: "white",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "10px",
    minWidth: "150px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",

  }

  return (
    <div >
      {userState === "on" ?
        <Nav style={navStyle} /> :
        <></>
      }
      <h1 style={{color:"yellow"}}>Benvenuto in Hold'em Words </h1>
      <div style={mainStyle}>

        <img src={"../public/HEW_Logo.png"} style={{ width: "30%", height: "30%" }} alt="" />
        <MainComponent />

      </div>
    </div>
  )
}

export default App;
