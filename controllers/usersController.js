const { pool } = require('../config');

class UsersController {
    static async getUserById(req, res) {
        pool.query('SELECT * FROM users where id=$1;', [1], (err, response) => {
            if (err) {
                res.status(500).json({ error: err.stack });
            } else {
                res.status(200).json(response.rows[0]);
            }
        });
    };

    static async addUser(req, res) {
        pool.query('SELECT MAX(id) FROM users;', (err, response) => {
            if (err) res.status(500).json({ error: err.stack });
            if (response && response.rows[0].max) {
                let val = response.rows[0].max + 1;
                insertUser('p' + val, res);
            } else {
                insertUser('p1', res);
            }
        });
    }
}

function insertUser(user, res) {
    pool.query('INSERT INTO users (name) VALUES ($1);', [user], (err, response) => {
        if (err) res.status(500).json({ error: err.stack });
        pool.query('SELECT MAX(id) FROM users;', (error, lastId) => {
            if (error) res.status(500).json({ error: error.stack });
            res.status(201).send({ idUser: lastId.rows[0].max });
        });
    });
}

module.exports = UsersController;