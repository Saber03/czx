console.log(JSON.parse(sessionStorage.getItem('arrR')));
var arrR = JSON.parse(sessionStorage.getItem('arrR'));
var pList = document.getElementsByClassName('player-list');
for (var i = 0; i < arrR.length; i++) {
    var item = document.createElement('div');
    var head = document.createElement('div');
    var pName = document.createElement('p');
    var pNumber = document.createElement('p');
    if (arrR[i].role == 'civilian') {
        pList[0].appendChild(item).appendChild(head).appendChild(pName).innerHTML = '平民';
        pList[0].appendChild(item).appendChild(head).appendChild(pNumber).innerHTML = i + 1 + '号';

    } else {
        pList[0].appendChild(item).appendChild(head).appendChild(pName).innerHTML = '杀手';
        pList[0].appendChild(item).appendChild(head).appendChild(pNumber).innerHTML = i + 1 + '号';
    }
    item.className = 'item';
    head.className = 'head';
    pName.className = 'player-name';
    pNumber.className = 'player-number';

    if (arrR[i].state == 'dead') {
        item.style.opacity = '0.5';
    }
}



document.getElementsByClassName('btn-close')[0].onclick = function () {
	window.location.href = 'player-setting.html';
}

document.getElementsByClassName('submit')[0].onclick = function () {
	window.location.href = 'game-step.html';
}