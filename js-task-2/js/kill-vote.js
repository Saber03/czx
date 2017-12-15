var arrR = JSON.parse(sessionStorage.getItem('arrR'));
var arrRtemp = JSON.parse(sessionStorage.getItem('arrR'));
var dayN = JSON.parse(sessionStorage.getItem('days'));
console.log(arrR);
console.log(dayN);

var title = document.getElementsByTagName('header')[0].getElementsByClassName('title');
var gList = document.getElementsByClassName('gamer-list');
var tips1 = document.getElementsByClassName('tips-1')[0].getElementsByTagName('p');
var tips2 = document.getElementsByClassName('tips-2');
var itemN = document.getElementsByClassName('item');
var submit = document.getElementsByClassName('submit');

if (dayN[dayN.length - 1].currentState == 'kill') {
    title[0].innerHTML = '杀手杀人';
    tips1[0].innerHTML = '杀手请睁眼，选择要杀的对象';
    tips2[0].innerHTML = '点击玩家头像';
} else {
    title[0].innerHTML = '投票';
    tips1[0].innerHTML = '发言环节结束，请大家投票';
    tips2[0].innerHTML = '点击获得最多票数的玩家头像';
}

for (var i = 0; i < arrR.length; i++) {
    var cloneItem = itemN[0].cloneNode(true);
    itemN[0].parentNode.appendChild(cloneItem);
    cloneItem.getElementsByClassName('number')[0].innerHTML = (i + 1) + '号';
    if (arrR[i].role == 'killer') {
        cloneItem.getElementsByClassName('name')[0].innerHTML = '杀手';
    }
    if (arrR[i].state == 'dead') {
        cloneItem.style.opacity = '0.5';
    }
}
itemN[0].parentNode.removeChild(itemN[0]);

gList[0].addEventListener('click', function(ev) {
    if (ev.target.nodeName.toLowerCase() == 'p') {
        for (var k = 0; k < arrR.length; k++) {
            if (ev.target.parentNode == itemN[k].children[0]) {
                break;
            }
        }
        if ((dayN[dayN.length - 1].currentState == 'kill') && (arrRtemp[k].role == 'civilian') && (arrRtemp[k].state == 'live')) {

            for (var i = 0; i < arrR.length; i++) {
                if (arrRtemp[i].state == 'live') {
                    arrR[i].state = arrRtemp[i].state;
                    itemN[i].style.opacity = '1';
                }
            }

            arrR[k].state = 'dead';
            itemN[k].style.opacity = '0.5';
            dayN[dayN.length - 1].night = arrR[k].role;
            dayN[dayN.length - 1].nightO = (k + 1);
            console.log(dayN);

        } else {
            console.log('不允许点击');
        }

        if ((dayN[dayN.length - 1].currentState == 'vote') && (arrRtemp[k].state == 'live')) {
            for (var i = 0; i < arrR.length; i++) {
                if (arrRtemp[i].state == 'live') {
                    arrR[i].state = arrRtemp[i].state;
                    itemN[i].style.opacity = '1';
                }
            }

            arrR[k].state = 'dead';
            itemN[k].style.opacity = '0.5';
            dayN[dayN.length - 1].day = arrR[k].role;
            dayN[dayN.length - 1].dayO = (k + 1);
            console.log(dayN);

        } else {
            console.log('不允许点击');
        }
    }
});

submit[0].onclick = function() {
    sessionStorage.setItem('arrR', JSON.stringify(arrR));
    sessionStorage.setItem('days', JSON.stringify(dayN));
    var countc = 0;
    var countk = 0;
    if (dayN[dayN.length - 1].currentState == 'kill') {
        for (var i = 0; i < arrR.length; i++) {
            if ((arrR[i].state == 'live') && (arrR[i].role == 'civilian')) {
                countc++;
            }
            if ((arrR[i].state == 'live') && (arrR[i].role == 'killer')) {
                countk++;
            }
        }

        if (JSON.stringify(arrRtemp) != JSON.stringify(arrR)) {
            if (countk >= countc) {
                window.location.href = "result.html";
            } else {
                window.location.href = "game-step.html";
            }
        }else {
        	alert('请选择！');
        }

    }

    if (dayN[dayN.length - 1].currentState == 'vote') {
        for (var i = 0; i < arrR.length; i++) {
            if ((arrR[i].state == 'live') && (arrR[i].role == 'civilian')) {
                countc++;
            }
            if ((arrR[i].state == 'live') && (arrR[i].role == 'killer')) {
                countk++;
            }
        }
        if (JSON.stringify(arrRtemp) != JSON.stringify(arrR)) {
            if ((countk >= countc) || (countk == 0)) {
                window.location.href = "result.html";
            } else {
                dayN[dayN.length] = { currentState: 'start' };
                sessionStorage.setItem('days', JSON.stringify(dayN));
                window.location.href = "game-step.html";
            }
        }else {
        	console.log('请选择');
        }

    }
}