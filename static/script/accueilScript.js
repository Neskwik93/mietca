let txtAccueil1 = document.getElementById('txtAccueil1');
let questionnaire = document.getElementById('questionnaire');

let inputAge = document.getElementById('inputAge');
let inputProffession = document.getElementById('inputProffession');
let inputWhichGame = document.getElementById('inputWhichGame');
let inputWhichStruct = document.getElementById('inputWhichStruct');
let textAreaWhichGames = document.getElementById('textAreaWhichGames');
let textAreaMatos = document.getElementById('textAreaMatos');

let radios = {
    etudeRadio: document.getElementsByName('etudeRadio'),
    genreRadio: document.getElementsByName('genreRadio'),
    freqRadio: document.getElementsByName('freqRadio'),
    joueurProRadio: document.getElementsByName('joueurProRadio'),
}

let state = 1;
let userInfo = {};

function start() {
    window.location.href = 'jeu.html';
}

function suivant() {
    switch (state) {
        case 1:
            txtAccueil1.style.display = 'none';
            questionnaire.style.display = 'block';
            state = 2;
            break;
        case 2:
            userInfo.age = inputAge.value;
            userInfo.genre = getRadioValue('genreRadio');
            userInfo.proffession = inputProffession.value;
            userInfo.nivEtude = getRadioValue('etudeRadio');
            userInfo.frequence = getRadioValue('freqRadio');
            userInfo.joueurPro = getRadioValue('joueurProRadio');
            userInfo.jeuPro = inputWhichGame.value;
            userInfo.structure = inputWhichStruct.value;
            userInfo.jeux = textAreaWhichGames.value;
            userInfo.materiel = textAreaMatos.value;
            console.log(userInfo)
            txtAccueil1.innerHTML = `<p class="mb-3 accueil" style="font-size: 20px;">
        <strong>
            Vous avez 30 minutes pour résoudre ce problème.<br>
            Dès que vous cliquerez sur "commencer" le chronomètre débutera.<br>
            Vous pouvez abandonner à tout moment.<br>
            Vous pouvez annuler une action à tout moment.
        </strong>
    </p>
    <div style="max-width: 80%; margin: auto;">
        <p>
            Trois missionnaires <strong>(M)</strong> et trois cannibales <strong>(C)</strong> sont
            sur une berge.<br>
            Ils doivent traverser la rivière et trouvent un bateau.
        </p>
        <p>
            Mais le bateau est si petit qu’il ne peut pas contenir plus de <strong>deux
                personnes.</strong>
            Si les missionnaires sur l’une ou l’autre berge sont surpassés en
            nombre par les cannibales, ces derniers mangeront les missionnaires.
        </p>
        <p>
            Trouve le moyen le plus simple permettant à <strong>tous les missionnaires et les
                cannibales</strong> de
            traverser la rivière en toute sécurité. On considère
            que tous les passagers du bateau débarquent avant le prochain voyage et <strong>au moins
                une
                personne doit être dans le bateau pour chaque traversée.</strong>
        </p>
    </div>
    <div class="accueil">
        <button class="btn btn-success" onclick="start()">Commencer</button>
    </div>`;
            break;
    }
}

function getRadioValue(name) {
    let returnValue;
    for (let i = 0; i < radios[name].length; i++) {
        if (radios[name][i].checked) {
            returnValue = radios[name][i].value;
        }
    }
    return returnValue;
}
