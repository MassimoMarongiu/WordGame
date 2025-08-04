import { useState } from "react";
import { Link } from "react-router-dom";


function Nav (){

    const navStyle={
        display:"flex",
        flexDirection:"column",
        background:"blue",
        color:"white"
    }
   const [showNav, setShowNav] = useState(false);

    const handleDisplayNav = () => {
        setShowNav(prev => !prev);
    };
    return (
    <div style={navStyle}>
        <button onClick={handleDisplayNav}>...</button>
          {showNav && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <Link to="/login_register">Login/Register</Link> */}
                    <Link to="/userProfile">Il mio Profilo</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
    </div>);


}

export default Nav;