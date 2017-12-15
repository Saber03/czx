/*创建玩家对象，玩家人数配比*/
function player(id, role, state) {
    this.id = id;
    this.role = role;
    this.state = state;
}

function createplayers(count) {
    var killer = []; /*杀手数组*/
    var civilian = []; /*平民数组*/
    /*角色比例*/
    if (count >= 6 && count <= 8) {
        for (var i = 0; i < 1; i++) {
            killer[i] = new player(i, "killer", "live");
        }
        for (var i = 0; i < count - 1; i++) {
            civilian[i] = new player(i, "civilian", "live");
        }
    }
    if (count >= 9 && count <= 11) {
        for (var i = 0; i < 2; i++) {
            killer[i] = new player(i, "killer", "live");
        }
        for (var i = 0; i < count - 2; i++) {
            civilian[i] = new player(i, "civilian", "live");
        }
    }
    if (count >= 12 && count <= 15) {
        for (var i = 0; i < 3; i++) {
            killer[i] = new player(i, "killer", "live");
        }
        for (var i = 0; i < count - 3; i++) {
            civilian[i] = new player(i, "civilian", "live");
        }
    }
    if (count >= 16 && count <= 18) {
        for (var i = 0; i < 4; i++) {
            killer[i] = new player(i, "killer", "live");
        }
        for (var i = 0; i < count - 4; i++) {
            civilian[i] = new player(i, "civilian", "live");
        }
    }
    console.log(killer.concat(civilian));
    return killer.concat(civilian); /*返回数组组合*/
}

/*玩家数组乱序*/
function randomDom(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        var temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    console.log(arr);
    sessionStorage.setItem('arrR', JSON.stringify(arr));
    return arr;
}

/*输入人数和滑块数量绑定*/
var pnumber = document.getElementsByClassName('number')[0].getElementsByTagName('input');
var prange = document.getElementsByClassName('slider');

pnumber[0].onchange = function() {
    var reg1 = /^\+?[1-9][0-9]*$/;
    if (reg1.test(pnumber[0].value) && pnumber[0].value >= 6 && pnumber[0].value <= 18) {
        prange[0].value = pnumber[0].value;
    } else {
        alert('玩家人数范围 6-18，请重新输入！');
        pnumber[0].value = 6;
        prange[0].value = pnumber[0].value;

    }
}
prange[0].onchange = function() {
    pnumber[0].value = prange[0].value;
}

/*添加配比节点*/
function list(arr) {
    var plist = document.getElementsByClassName('player-list')[0].getElementsByTagName('ul');
    plist[0].innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement('li');
        var content = document.createElement('span');
        plist[0].appendChild(li).appendChild(content);

        if (arr[i].role == 'civilian') {
            content.innerHTML = '平&nbsp&nbsp&nbsp民1人';
            plist[0].appendChild(li).style.color = '#fab344';
        }
        if (arr[i].role == 'killer') {
            content.innerHTML = '杀&nbsp&nbsp&nbsp手1人';
            plist[0].appendChild(li).style.color = '#29bde0';
        }
    }
}

/*点击设置按钮完成玩家人数配比*/
var pset = document.getElementsByClassName('setting-btn');
pset[0].onclick = function() {
    var players = createplayers(pnumber[0].value);
    var playersR = randomDom(players);
    list(playersR);
}

/*获取、保存平民和杀手词组*/
var cword = document.getElementsByClassName('civilian');
var kword = document.getElementsByClassName('killer')

cword[0].onchange = function() {
    sessionStorage.setItem('cword', cword[0].value);
}
kword[0].onchange = function() {
    sessionStorage.setItem('kword', kword[0].value);
}

/*跳转发牌页面*/
var startBtn = document.getElementsByClassName('start-btn');
startBtn[0].onclick = function() {
    console.log(sessionStorage.getItem('arrR'));
    if (sessionStorage.getItem('arrR') != null) {
        window.location.href = "watch-identity.html";
    }else {
        alert('请设置玩家数！');
    }
}

/*初始化，供游戏步骤页面使用*/
function initDay () {
    var i = 0;
    var day = [];
    day[i] = {currentState:"start"};
    sessionStorage.setItem('days', JSON.stringify(day));
}

initDay();