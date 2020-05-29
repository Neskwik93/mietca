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
        let user = req.body;
        pool.query('SELECT MAX(id) FROM users;', (err, response) => {
            if (err) res.status(500).json({ error: err.stack });
            if (response && response.rows[0].max) {
                let val = response.rows[0].max + 1;
                user.name = 'p' + val;
                insertUser(user, res);
            } else {
                user.name = 'p1';
                insertUser(user, res);
            }
        });
    }
}

function insertUser(user, res) {
    pool.query(`INSERT INTO users (name, age, genre, proffession, niv_etude, frequence, joueur_pro, jeu_pro, structure, jeux, materiel) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [user.name, user.age, user.genre, user.proffession, user.nivEtude, user.frequence, user.joueurPro, user.jeuPro, user.structure, user.jeux, user.materiel], (err, response) => {
            if (err) res.status(500).json({ error: err.stack });
            pool.query('SELECT MAX(id) FROM users;', (error, lastId) => { 
                if (error) res.status(500).json({ error: error.stack });
                res.status(201).send({ idUser: lastId.rows[0].max });
            });
        });
}

module.exports = UsersController;