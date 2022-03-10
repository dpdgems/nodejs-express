let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass1234",
    database: "world",
});

connection.connect((error) => {
    if (!!error) {
        console.log(error)
    } else {
        console.log('Database Connected...')
    }
});

module.exports = connection;