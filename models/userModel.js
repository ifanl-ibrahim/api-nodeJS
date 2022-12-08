const connexion = require('../database/connection');

class User {
    users = () => {
        return new Promise((resolve, reject) => {
            connexion.query('SELECT lastname, firstname FROM users', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    };

    groups = () => {
        return new Promise((resolve, reject) => {
            connexion.query('SELECT name FROM groupes', (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    };

    usersList = (req, res, id) => {
        connexion.query('SELECT lastname, firstname FROM `users` WHERE groupe_id ='(id), (err, rows) => {
            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            res.send(rows);
        });
        console.log('users');
    };

    add = (email, password, firstname, lastname) => {
        return new Promise((resolve, reject) => {
            connexion.query('INSERT INTO `users` (`email`, `password`, `firstname`, `lastname`, `createdAt`) VALUES (?, ?, ?, ?, NOW())', [email, password, firstname, lastname], (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    };

    checkLogin = async (email, password) => {
        return new Promise((resolve, reject) => {
            connexion.query('SELECT * FROM `users` WHERE email = ? and password = ?', [email, password], (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    if (rows.length > 0) {
                        const hash = rows[0].password;
                        const result = bcrypt.compareSync(password, hash);
                        return resolve(result);
                    } else {
                        return resolve(false);
                    }
                }
            });
        });
    }

    findOneByEmail = async (email) => {
        return new Promise((resolve, reject) => {
            connexion.query('SELECT * FROM `users` WHERE email = ?', [email], (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    }
}

module.exports = User;