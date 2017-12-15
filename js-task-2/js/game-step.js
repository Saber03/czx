var arrR = JSON.parse(sessionStorage.getItem('arrR'));
var dayN = JSON.parse(sessionStorage.getItem('days'));
console.log(arrR);
console.log(dayN);

var pday = document.getElementsByClassName('day');
var pkill = document.getElementsByClassName('kill');
var pdead = document.getElementsByClassName('dead');
var pliving = document.getElementsByClassName('living');
var pvote = document.getElementsByClassName('vote');
var jLog = document.getElementsByClassName('judge-log');
var gOver = document.getElementsByClassName('game-over');


if (dayN.length > 1) {
    for (var n = 1; n < dayN.length; n++) {
        var clonedDay = pday[0].cloneNode(true);
        clonedDay.getElementsByClassName('day-number')[0].innerHTML = '第' + (n + 1) + '天';
        pday[0].parentNode.appendChild(clonedDay);
    }
}
for (var k = 0; k < dayN.length; k++) {
    if (dayN[k].currentState == 'kill') {
        pkill[k].style.backgroundColor = '#fc8923';
    }
    if (dayN[k].currentState == 'dead') {
        pkill[k].style.backgroundColor = '#fc8923';
        pdead[k].style.backgroundColor = '#fc8923';
    }
    if (dayN[k].currentState == 'living') {
        pkill[k].style.backgroundColor = '#fc8923';
        pdead[k].style.backgroundColor = '#fc8923';
        pliving[k].style.backgroundColor = '#fc8923';
    }
    if (dayN[k].currentState == 'vote') {
        pkill[k].style.backgroundColor = '#fc8923';
        pdead[k].style.backgroundColor = '#fc8923';
        pliving[k].style.backgroundColor = '#fc8923';
        pvote[k].style.backgroundColor = '#fc8923';
    }
}

pkill[dayN.length - 1].onclick = function() {
    if (dayN[dayN.length - 1].currentState == 'start') {
        console.log('杀手杀人');
        dayN[dayN.length - 1].currentState = 'kill';
        sessionStorage.setItem('days', JSON.stringify(dayN));
        window.location.href = "kill-vote.html";
    } else {
        alert('请按顺序游戏');
    }
}

pdead[dayN.length - 1].onclick = function() {
    if (dayN[dayN.length - 1].currentState == 'kill') {
        alert('亡灵发表遗言');
        dayN[dayN.length - 1].currentState = 'dead';
        sessionStorage.setItem('days', JSON.stringify(dayN));
        pdead[dayN.length - 1].style.backgroundColor = '#fc8923';
    } else {
        alert('请按顺序游戏');
    }
}

pliving[dayN.length - 1].onclick = function() {
    if (dayN[dayN.length - 1].currentState == 'dead') {
        alert('玩家依次发言');
        dayN[dayN.length - 1].currentState = 'living';
        sessionStorage.setItem('days', JSON.stringify(dayN));
        pliving[dayN.length - 1].style.backgroundColor = '#fc8923';
    } else {
        alert('请按顺序游戏');
    }
}

pvote[dayN.length - 1].onclick = function() {
    if (dayN[dayN.length - 1].currentState == 'living') {
        dayN[dayN.length - 1].currentState = 'vote';
        sessionStorage.setItem('days', JSON.stringify(dayN));
        window.location.href = "kill-vote.html";
    } else {
        alert('请按顺序游戏');
    }
}

jLog[0].onclick = function() {
    window.location.href = "judge-log.html";
}

gOver[0].onclick = function() {
    window.location.href = "result.html";
}