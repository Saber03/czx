var arrR = JSON.parse(sessionStorage.getItem('arrR'));
var dayN = JSON.parse(sessionStorage.getItem('days'));
console.log(arrR);console.log(dayN);
var victory = document.getElementsByClassName('victory');
var main = document.getElementsByTagName('main')
var btn = document.getElementsByClassName('btn');

var countc = 0;var countk = 0;
for (var i = 0; i < arrR.length; i++) {
    if ((arrR[i].state == 'live') && (arrR[i].role == 'civilian')) {
        countc++;
    }
    if ((arrR[i].state == 'live') && (arrR[i].role == 'killer')) {
        countk++;
    }
}
console.log('杀手：'+countk);console.log('平民：'+countc);
if (countk >= countc) {
	victory[0].getElementsByTagName('span')[0].innerHTML = '杀手胜利';
}else {
	victory[0].getElementsByTagName('span')[0].innerHTML = '平民胜利';
}

for (var i = 0; i < dayN.length; i++) {
	var list = document.createElement('div');
	var num = document.createElement('div');
	var night = document.createElement('div');
	var day = document.createElement('div');

	main[0].appendChild(list).appendChild(num);
	main[0].appendChild(list).appendChild(night);
	main[0].appendChild(list).appendChild(day);

	list.className = 'list';
	num.className = 'num';
	night.className = 'night';
	day.className = 'day';

	num.innerHTML = '第' + (i+1) + '天';
	night.innerHTML ='晚上：'+ dayN[i].nightO + '号被杀手杀死，' + dayN[i].nightO + '号是'+ ((dayN[i].night == 'civilian') ? '平民' : '杀手');
	day.innerHTML = '白天：'+ dayN[i].dayO + '号被全民投票投死，' + dayN[i].dayO + '号是'+ ((dayN[i].day == 'civilian') ? '平民' : '杀手');
}

btn[0].onclick =function () {
	window.location.href = "player-setting.html";
}