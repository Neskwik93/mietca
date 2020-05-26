const { pool } = require('../config');
const { genererCSV } = require('../utils');
const fs = require('fs');

class boController {
    static async checkPass(passToCheck) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM backoffice;', (err, response) => {
                if (err) reject({ error: err.stack });
                else {
                    if (passToCheck === response.rows[0].tusaispotsais) {
                        resolve({ valid: true });
                    }
                    else reject({ valid: false });
                }
            });
        });
    }

    static async getValue(req, res) {
        let passToCheck = req.body.passToCheck;
        boController.checkPass(passToCheck)
            .then(response => {
                if (response.valid) {
                    boController.getAll().then(response => {
                        res.status(200).json(response);
                    }).catch(err => res.status(500).json(err));
                } else {
                    res.status(500).json({ error: 'wrong password' });
                }
            })
            .catch(err => res.status(500).json(err))
    }

    static async download(req, res) {
        let passToCheck = req.body.passToCheck;
        boController.checkPass(passToCheck)
            .then(response => {
                if (response.valid) {
                    boController.getAll().then(response => {
                        genererCSV(response).then(filename => {
                            if (fs.existsSync(filename)) {
                                res.download(filename);
                            } else {
                                res.status(404).json({ error: 'file not found' });
                            }
                        }).catch(err => res.status(500).json(err));
                    }).catch(err => res.status(500).json(err));
                }
                else {
                    res.status(500).json({ error: 'wrong password' });
                }
            }).catch(err => res.status(500).json(err))
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            let queryStr = `SELECT t1.value, t1.time, t2.name 
            FROM coup t1
            INNER JOIN users t2 ON t1.user_id = t2.id
            ORDER BY t1.id;`
            pool.query(queryStr, (err, response) => {
                if (err) reject({ error: err.stack });
                else resolve({ value: response.rows, valid: true });
            });
        });
    }
}

module.exports = boController;