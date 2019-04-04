// * Importing Libraries
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

// * Initializing the Server
const port = process.env.PORT || 3001;
const server = express();

// * Adding Middleware
server.use(express.json());
server.use(cors());

// * Connecting to the Database
const { DB_HOST, DB_USERNAME, DB_PASS, DB_NAME } = process.env;
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) console.log(`There was an error connecting to the database: ${err}`);
    else console.log(`The database is connected`);
});

// * Routes
server.get('/', (req, res) => res.send(`The server is live!`));
server.get('/skins', (req, res) => { // Main route to access all skins
    connection.query('SELECT * FROM data', (err, results, fields) => {
        if (err) res.status(404).json({ retrievingSkinsError: "Skins could not be retrieved from the database--please try again" });
        else res.status(200).json(results);
    })
})

// * Starting the Server
server.listen(port, () => console.log(`The server is listening on port ${port}`));