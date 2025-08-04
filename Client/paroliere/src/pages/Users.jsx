import React, { useEffect, useState } from "react";
import axios from "axios";


function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://192.168.1.2:3000/usersList")  
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                setError("Errore nel recuperare gli utenti: " + err.message);
            });
    }, []);


    return (
        <div>
            <h1>Users</h1>
            {error && <p>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
