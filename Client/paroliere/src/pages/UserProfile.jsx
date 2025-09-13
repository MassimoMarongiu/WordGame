import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Nav from "../components/Nav";
import Credits from "../components/Credits";
// import MatchHistory from "../components/MatchHistory";
import "../styles/buttonStyle.css"

function UserProfile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login_register'); 
        }
    }, [user, navigate]); 
    if (!user) {
        return null;
    }

    function backToHome(){
        navigate('/');
    }

    return (
        <>
            {/* <Nav />  */}
            <div>
                <h1 style={{color:"yellow", fontSize:"100px"}}>{user.username}</h1>
                <Credits/>

                {/* <MatchHistory userId={user.id} /> */}

                <button class="playButtonStyle">Modifica Profilo</button>
                <button class="playButtonStyle" onClick={backToHome}>torna alla HOME</button>
            </div>
        </>
    );
}

export default UserProfile;