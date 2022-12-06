// Import express, mysql, myConnection && initialize the connection
const mysql = require('mysql');

// options for the connection
const connexion = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'api-nodejs'
});

//Définition du middleware pour la connexion à la base de données

connexion.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = connexion;