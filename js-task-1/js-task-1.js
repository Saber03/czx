/*同时生成0-8之间的三个不相同随机数*/
function randomDom(length) {
	var arr = new Array(length);
	length = typeof(length) === 'undefined' ? 9 : length;
	for (var i = 0; i < length; i++) {
		arr[i] = i;
	}
	var len = arr.length;
	for (var i = 0; i < len - 1; i++) {
		var idx = Math.floor(Math.random() * (len - i));
		var temp = arr[idx];
		arr[idx] = arr[len - i - 1];
		arr[len - i - 1] = temp;
	}
	return arr.slice(0, 3);
}

/*随机生成RGB颜色*/
function randomRgbaColor() {
	var r = Math.floor(Math.random() * 256); //随机生成256以内r值
	var g = Math.floor(Math.random() * 256); //随机生成256以内g值
	var b = Math.floor(Math.random() * 256); //随机生成256以内b值
	return `rgb(${r},${g},${b})`; //返回rgba(r,g,b)格式颜色
}

var square = document.getElementsByClassName('square');
var btnStart = document.getElementsByClassName('start');
var btnEnd = document.getElementsByClassName('end');

function changeColor() {
	for (var i = 0; i < square.length; i++) {
		square[i].style.backgroundColor = '#fda40e';
	}
	var rDom = randomDom(9);
	square[rDom[0]].style.backgroundColor = randomRgbaColor();
	square[rDom[1]].style.backgroundColor = randomRgbaColor();
	square[rDom[2]].style.backgroundColor = randomRgbaColor();
}

function start() {
	btnStart[0].style.backgroundColor = '#fda40e';
	btnEnd[0].style.backgroundColor = '#fff';
	changeColor();
	timer = setInterval(changeColor, 1200);
	btnStart[0].onclick = function() {
		console.log('禁止连续点击')
	};

}

function end() {
	btnStart[0].style.backgroundColor = '#fff';
	btnEnd[0].style.backgroundColor = '#fda40e';
	clearInterval(timer);
	for (var i = 0; i < square.length; i++) {
		square[i].style.backgroundColor = '#fda40e';
	}
	btnStart[0].onclick = start;
}

btnStart[0].onclick = start;

btnEnd[0].onclick = end;