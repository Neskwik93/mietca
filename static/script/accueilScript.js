let urlBackend = 'http://localhost/';
/* let urlBackend = 'http://34.78.14.249/'; */

let txtAccueil1 = document.getElementById('txtAccueil1');
let questionnaire = document.getElementById('questionnaire');
let textErreur = document.getElementById('textErreur');
let onlyPro = document.getElementsByClassName('onlyPro');
let btnSuivant= document.getElementById('btnSuivant');

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
            let valid = true;
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
            if (!userInfo.age || !userInfo.proffession || !userInfo.jeux || !userInfo.materiel) {
                valid = false;
            }
            if (userInfo.joueurPro === 'Oui' && (!userInfo.jeuPro || !userInfo.structure)) {
                valid = false;
            }
            if (userInfo.joueurPro === 'Non') {
                userInfo.jeuPro = null;
                userInfo.structure = null;
            }
            if (valid) {
                textErreur.style.display = 'none';
                btnSuivant.style.display = 'none';
                txtAccueil1.style.display = 'block';
                questionnaire.style.display = 'none';
                $.post(urlBackend + 'api/v1/users', userInfo, (data) => {
                    localStorage.setItem('idUser', data.idUser);
                });
                txtAccueil1.innerHTML = `<p class="mb-3 accueil" style="font-size: 20px;">
                <strong>
                    A présent, je vais vous donner un problème que vous allez devoir résoudre dans un délai de 30 minutes.<br> Vous avez le droit d’abandonner.
                    La consigne sera accessible pendant la résolution du problème.<br>
                    En cas de transgression des règles, le jeu vous signalera votre erreur.<br> Vous pourrez soit revenir au coup précédent, soit revenir au début.        
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
            } else {
                textErreur.style.display = 'block';
            }
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

function switchPro() {
    for (let i = 0; i < onlyPro.length; i++) {
        onlyPro[i].style.display = getRadioValue('joueurProRadio') === 'Oui' ? 'block' : 'none';
    }
}