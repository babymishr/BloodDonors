const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rabina@123",
    database: "bloodconnect",
});

connection.connect((err) =>{
    if (err){
        console.log("Database connection failed");
        console.log(err);
        return;
    }
    console.log("mySQL connected succesfully");
});

module.exports = connection;