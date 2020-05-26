let jeuElem = document.getElementById('jeu-elem');
let boElem = document.getElementById('bo-elem');
let passwordElem = document.getElementById('password');
let body = document.getElementsByTagName('body')[0];
let affichageCoup = document.getElementById('affichageCoup');
let ttCoupParUser = [];

let strToCheck = '';

body.addEventListener('keydown', (event) => {
    strToCheck += event.key;
    if (strToCheck.includes('alyssalabest')) {
        jeuElem.style.display = 'none';
        boElem.style.display = 'block';
    }
    if (strToCheck.length > 60) {
        strToCheck = '';
    }
    if (event.key === 'Enter' && passwordElem.value.length > 0) {
        send();
    }
});

function back() {
    jeuElem.style.display = 'block';
    boElem.style.display = 'none';
}

function send() {
    $.post(urlBackend + 'api/v1/bo', { passToCheck: passwordElem.value }, (response) => {
        if (response.valid) {
            let ttCoupToSort = response.value.length > 0 ? response.value : [];
            let lastUser;
            ttCoupToSort.forEach(cts => {
                if (lastUser === cts.name) {
                    let coupUser = ttCoupParUser.find(cpu => cpu.name === cts.name);
                    coupUser.ttCoup.push({ value: cts.value, time: cts.time });
                } else {
                    ttCoupParUser.push({ name: cts.name, ttCoup: [{ value: cts.value, time: cts.time }] });
                    lastUser = cts.name;
                }
            });
            setHtml();
        }
    });
}

function setHtml() {
    affichageCoup.innerHTML = '';
    let str = '';
    ttCoupParUser.forEach(cpu => {
        str += '<h5>' + cpu.name + '</h5>';
        str += `
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Numero coup</th>
                    <th scope="col">Temps</th>
                    <th scope="col">Coup</th>
                </tr>
            </thead>
            <tbody>
        `;
        cpu.ttCoup.forEach(coup => {
            str += `
                <tr>
                    <td>` + (cpu.ttCoup.indexOf(coup) + 1) + `</td>
                    <td>` + coup.time + `</td>
                    <td>` + coup.value + `</td>
                </tr>
            `;
        });
        str += `
                </tbody>
            </table>
        `;
    });
    affichageCoup.innerHTML = str;
}

function downloadCSV() {
    $.post('api/v1/bo/download', { passToCheck: passwordElem.value }).then(res => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(res));
        element.setAttribute('download', 'data.csv');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });
}
