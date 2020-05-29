let ttPart = document.getElementsByClassName('part');
let btnBasculeCont = document.getElementById('btn-bascule-cont');
let plateau = document.getElementById('plateau');
let timerElem = document.getElementById('timer-elem');
let timerEndElem = document.getElementById('timer-end-elem');
let erreurElem = document.getElementById('erreur-elem');
let victoryElem = document.getElementById('victory-elem');
let imgArrow = document.getElementById('img-arrow');
let ttCoupToInsert = [];
let ttElement = {
    rgwait: document.getElementById('rgWait'),
    rginBoat: document.getElementById('rgInBoat'),
    rdwait: document.getElementById('rdWait'),
    rdinBoat: document.getElementById('rdInBoat'),
};

let state, ttState, timerBegin, intervalGame, right, valid, win, idUser, lastTime, currentTime;

function init() {
    initVariable();

    if (data.idUser) {
        idUser = data.idUser;
        timerElem.innerHTML = '<strong>00:00</strong>';
        timerBegin = moment(new Date());
        lastTime = timerBegin;
        intervalGame = setInterval(() => {
            currentTime = moment(new Date());
            let timeString = getTimeString(currentTime, timerBegin);
            timerElem.innerHTML = '<strong>' + timeString + '</strong>';
            if (timeString[0] == 3) { //si 30 minute mais en moche
                endGame(true);
            }
        }, 1000);
        displayeState();
    } else {
        console.log(data);
    }
}

function getTimeString(time, timeToSoustract) {
    let diffMin = time.diff(timeToSoustract, 'minutes');
    let diffSec = time.diff(timeToSoustract, 'seconds');
    if (diffMin === 0 && diffSec === 0) diffSec = 1;
    return (diffMin < 10 ? '0' + diffMin : diffMin) + ':' + (diffSec % 60 < 10 ? '0' + diffSec % 60 : diffSec % 60)
}

function endGame(timePass = false) { // redirect acceuil
    clearInterval(intervalGame);
    plateau.style.display = 'none';
    let preMessage = '';
    if (timePass) {
        preMessage += 'Les 30 minutes ont été dépassées ';
    } else {
        preMessage = win ? 'Victoire au bout de ' : 'Abandon au bout de ';
    }
    addCoup(preMessage + '<strong>' + getTimeString(currentTime, timerBegin) + '</strong> : ');
    window.location.href = 'index.html';
}

function initVariable() {
    erreurElem.style.display = 'none';
    victoryElem.style.display = 'none';
    timerBegin = null;
    valid = true;
    right = true;
    win = false;
    imgArrow.style.transform = 'none';
    state = {
        rg: { wait: ['c', 'c', 'c', 'm', 'm', 'm'], inBoat: [] },
        rd: { wait: [], inBoat: [] }
    };
    ttState = [JSON.parse(JSON.stringify(state))];
}

function restart() {
    if (ttState.length > 1 && !win) {
        ttState.splice(1);
        state = JSON.parse(JSON.stringify(ttState[0]));
        addCoup('Remise à zero : ');
        checkValidCoup();
        setArrowDirection();
        displayeState();
    }
}

function cancelLastAction() {
    if (ttState.length > 1 && !win) {
        ttState.pop();
        state = JSON.parse(JSON.stringify(ttState[ttState.length - 1]));
        addCoup('Annulation dernier coup : ');
        checkValidCoup();
        setArrowDirection();
        displayeState();
    }
}

function displayeState() {
    for (let k in state) {
        setPassager(k, 'wait');
        setPassager(k, 'inBoat');
    }
}

function setPassager(rive, status) {
    let elem = ttElement[rive + status];
    elem.innerHTML = '';
    state[rive][status].forEach(passager => {
        elem.innerHTML += `<div class="col mb-2">
                                <div class="passager clickable d-flex justify-content-center align-item-center" onClick="changeState('`+ passager + `', '` + rive + status + `')">
                                    <span>` + passager + `</span>
                                </div>
                            </div>`
    });
}

function changeState(passager, element) {
    if (valid && !win) {
        switch (element) {
            case 'rgwait':
                if (right) switchPassager('rg', 'wait', 'inBoat', passager);
                break;
            case 'rdwait':
                if (!right) switchPassager('rd', 'wait', 'inBoat', passager);
                break;
            case 'rdinBoat':
                switchPassager('rd', 'inBoat', 'wait', passager);
                break;
            case 'rginBoat':
                switchPassager('rg', 'inBoat', 'wait', passager);
                break;
        };
        if (state.rg.inBoat.length > 0 || state.rd.inBoat.length > 0) {
            btnBasculeCont.style.display = 'flex';
        } else {
            btnBasculeCont.style.display = 'none';
        }
        displayeState();
    }
}

function switchPassager(riveInitiale, etatInitial, etatDestination, passager, riveDestination = riveInitiale) {
    let valid = true;
    if (etatDestination === 'inBoat') {
        valid = state[riveDestination][etatDestination].length === 2 ? false : valid;
        if (riveInitiale === 'rg') {
            valid = state.rd.inBoat.length > 0 ? false : valid;
        }
        if (riveInitiale === 'rd') {
            valid = state.rg.inBoat.length > 0 ? false : valid;
        }
    }

    if (valid) {
        let id = state[riveInitiale][etatInitial].findIndex(p => p === passager);
        state[riveInitiale][etatInitial].splice(id, 1);
        state[riveDestination][etatDestination].push(passager);
    }
}

function bascule() {
    if (state.rg.inBoat.length > 0) {
        basculePassager('rg', 'rd');
    } else if (state.rd.inBoat.length > 0) {
        basculePassager('rd', 'rg');
    }

    ttState.push(JSON.parse(JSON.stringify(state)));
    setArrowDirection();
    checkValidCoup();
    displayeState();
    checkWin();
}

function basculePassager(riveInitiale, riveDestination) {
    let ttPassagerToMove = Array.from(state[riveInitiale].inBoat);
    ttPassagerToMove.forEach(passager => {
        switchPassager(riveInitiale, 'inBoat', 'wait', passager, riveDestination);
    });
    btnBasculeCont.style.display = 'none'
}

function setArrowDirection() {
    if ((ttState.length - 1) % 2 === 0) {
        imgArrow.style.transform = 'none';
        right = true;
    } else {
        imgArrow.style.transform = 'rotate(180deg)';
        right = false;
    }
}

function checkValidCoup() {
    let res = countPassengers();
    if (((res.nbMiRg < res.nbCaRg && res.nbMiRg > 0) || (res.nbMiRd < res.nbCaRd && res.nbMiRd > 0))) {
        erreurElem.style.display = 'block';
        valid = false;
    } else {
        erreurElem.style.display = 'none';
        valid = true;
    }
}

function countPassengers() {
    let response = {};
    response.nbMiRg = state.rg.wait.filter(passager => passager === 'm').length;
    response.nbCaRg = state.rg.wait.filter(passager => passager === 'c').length;
    response.nbMiRd = state.rd.wait.filter(passager => passager === 'm').length;
    response.nbCaRd = state.rd.wait.filter(passager => passager === 'c').length;
    return response;
}

function checkWin() {
    if (state.rd.wait.length === 6) {
        win = true;
        victoryElem.style.display = 'block';
        timerEndElem.innerHTML = timerElem.innerHTML;
        clearInterval(intervalGame);
        endGame();
    } else {
        addCoup();
    }
}

function addCoup(preValue = null) {
    let value = preValue ? preValue + setCoupValue() : setCoupValue();
    ttCoupToInsert.push({ value: value, idUser: idUser, time: getTimeString(currentTime, lastTime) });
    $.post(urlBackend + 'api/v1/coup', { value: value, idUser: idUser, time: getTimeString(currentTime, lastTime) });
    lastTime = currentTime;
}

function setCoupValue() {
    let res = countPassengers();
    let value = '';
    if (res.nbMiRg > 0) value += res.nbMiRg + ' missionnaire(s)';
    if (res.nbCaRg > 0) {
        if (value) value += ' ';
        value += res.nbCaRg + ' cannibale(s)';
    }
    if (value) value += ' berge gauche';
    if (res.nbCaRg > 0 || res.nbMiRg > 0) value += ', ';
    if (res.nbMiRd > 0) value += res.nbMiRd + ' missionnaire(s)';
    if (res.nbCaRd > 0) {
        if (res.nbMiRd > 0) value += ' ';
        value += res.nbCaRd + ' cannibale(s)';
    }
    if (res.nbCaRd > 0 || res.nbMiRd > 0) value += ' berge droite';
    // exemple resultat attendu: 3 missionaires 1 cannibale berge gauche, 2 cannibales berge droite
    return value;
}

init();