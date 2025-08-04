const db = require("./connection");

function usersManagment(req, res) {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(results);
    });

//     if(method==="DELETE"){

    // }
    // if(method ==="PUT"){
        
    // }
}

module.exports = usersManagment;