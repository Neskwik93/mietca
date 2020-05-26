const fs = require('fs');

module.exports.genererCSV = function (data) {
    return new Promise((resolve, reject) => {
        let str = 'Joueur;Action;Temps\r\n';
        let oldPlayer;
        data.value.forEach(coup => {
            if (coup.name !== oldPlayer) {
                str += coup.name + '\r\n';
            }
            oldPlayer = coup.name;
            coup.value = coup.value.replace(/(<([^>]+)>)/ig, '');
            str += ';' + coup.value + ';' + coup.time + '\r\n';
        });
        fs.writeFileSync('data.csv', str, 'ascii');
        resolve('data.csv');
    });
}