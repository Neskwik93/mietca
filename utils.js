const fs = require('fs');

module.exports.genererCSV = function (ttCoup, ttUser) {
    return new Promise((resolve, reject) => {
        let str = '';
        ttUser.forEach(user => {
            let ttCoupByUser = ttCoup.value.filter(c => c.name === user.name);
            str += 'Nom;' + user.name + ';\r\n';
            str += 'Age;' + user.age + ' ans;\r\n';
            str += 'Genre;' + user.genre + ';\r\n';
            str += 'Proffession;' + user.proffession + ';\r\n';
            str += 'Niveau d\'étude;' + user.niv_etude + ';\r\n';
            str += 'Fréquence;' + user.frequence + ';\r\n';
            str += 'Joueur pro;' + user.joueur_pro + ';\r\n';
            str += user.joueur_pro === 'Oui' ? 'Jeu pro;' + user.jeu_pro + ';\r\n' : '';
            str += user.joueur_pro === 'Oui' ? 'Structure;' + user.structure + ';\r\n' : '';
            str += 'Jeux de stratégie;' + user.jeux + ';\r\n';
            str += 'Besoins matériels/immatériels;' + user.materiel + ';\r\n\r\n';
            str += 'Actions;\r\n';
            ttCoupByUser.forEach(coup => {
                coup.value = coup.value.replace(/(<([^>]+)>)/ig, '');
                str += ';' + coup.value + ';' + coup.time + '\r\n';
            });
            str += '\r\n\r\n\r\n\r\n';
        });
        try {
            fs.writeFileSync('data.csv', str, 'utf8');
        } catch (err) {
            reject(err);
        }
        resolve('data.csv');
    });
}