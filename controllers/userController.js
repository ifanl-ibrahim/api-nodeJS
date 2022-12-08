const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    await User.users()
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des utilisateurs."
            });
        });
};

exports.getGroup = async (req, res) => {
    await User.groups()
        .then((rows) => {
            res.status(200).send(rows);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des groupes."
            });
        });
};

exports.getUsersList = async (req, res) => {
    const id = req.params.id;
    await User.usersList(id)
        .then((rows) => {
            res.status(200).send(rows);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des utilisateurs."
            });
        });
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const hash = bcrypt.hashSync(password, 10);
        const user = new User(email, hash, firstname, lastname);
        await user.add(email, hash, firstname, lastname)
            .then((rows) => {
                res.status(200).send(rows);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Une erreur est survenue lors de la création de l'utilisateur."
                });
            });
    }
};

exports.login = async (req, res) => {
    const connexion = await User.checkLogin(req.body.email, req.body.password);

    if (connexion === true) {
        const user = await User.findOneByEmail(req.body.email);
        console.log(user[0].id);
        const token = jwt.sign({ id: user[0].id}, accessTokenSecret, { expiresIn: '1h' });
        res.status(200).send({ 'token': token });
    } else {
        res.status(404).send({
            message: "Login ou mot de passe incorrect."
        });
    }
};