const User = require('../models/userModel');
const connexion = require('../database/connection');

exports.home = (req, res) => {
    res.render('home');
}

exports.users = (req, res) => {
    connexion.query('SELECT lastname, firstname FROM users', function (err, rows) {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
    });
    console.log('users');
};

exports.groupes = (req, res) => {
    connexion.query('SELECT name FROM groupes', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
    });
    console.log('groupes');
};

exports.usersList = (req, res) => {
    connexion.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
    });
    console.log('users');
    // res.send('users');
};

exports.login = (req, res) => {
    // connexion.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], (err, rows) => {
    //     if (err) throw err;
    //     console.log('Data received from Db:\n');
    //     console.log(rows);
    //     res.send(rows);
    // });
    console.log('login');
}

exports.register = (req, res) => {
    let user = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.password);
    connexion.query('INSERT INTO users SET ?', user, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
    });
    console.log('register');
}