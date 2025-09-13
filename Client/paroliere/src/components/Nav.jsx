import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/nav.css';  

function Nav() {
    const [showNav, setShowNav] = useState(false);

    const handleDisplayNav = () => {
        setShowNav(prev => !prev);
    };
    
    return (
        <div className={showNav ? "nav-open" : "nav-closed"}>
            <button className="nav-toggle-btn" onClick={handleDisplayNav}>
                Menù
            </button>
            <div>

            {showNav && (
                <div className="nav-links">
                    <Link to="/userProfile">Il mio Profilo</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
            </div>
        </div>
    );
}

export default Nav;