import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Nav from "../components/Nav";
import Credits from "../components/Credits";
// import MatchHistory from "../components/MatchHistory";

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

    return (
        <>
            {/* <Nav />  */}
            <div>
                <h1>Benvenuto, {user.username}!</h1>
                <Credits/>

                {/* <MatchHistory userId={user.id} /> */}

                <button>Modifica Profilo</button>
            </div>
        </>
    );
}

export default UserProfile;