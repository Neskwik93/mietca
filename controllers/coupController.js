const { pool } = require('../config');

class coupController {
    static async addCoup(req, res) {
        let body = req.body;
        pool.query('INSERT INTO coup (value, user_id, time) VALUES($1, $2, $3);', [body.value, body.idUser, body.time], (err, response) => {
            if (err) res.status(500).json({ error: err.stack });
            res.status(201).send('created');
        });
    }
}

module.exports = coupController;