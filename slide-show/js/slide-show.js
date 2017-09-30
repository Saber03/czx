window.onload = function() {


	var ap = document.getElementsByClassName('pre');
	var sl = document.getElementsByClassName('slide');
	var an = document.getElementsByClassName('next');
	var imgs = document.getElementsByClassName('slide-img');
	var ubtn = document.getElementsByClassName('button');
	var btns = ubtn[0].getElementsByTagName('li');


	! function arrowpre() {
		ap[0].onclick = function() {
			var n = 600;
			var speed = 20;
			var start;
			! function animat() {
				n -= speed;
				if (n >= 0) {
					sl[0].style.marginLeft = parseInt(getComputedStyle(sl[0], ).marginLeft) + speed + 'px';
					setTimeout(function() {
						animat()
					}, 10);
				}
				if (parseInt(sl[0].style.marginLeft + 0) == 0) {
					sl[0].style.marginLeft = '-3000px';
				}
			}();

			for (var i = 0; i < btns.length; ++i) {
				if (btns[i].className == 'btn-on') {
					start = i;
				}
			}
			btns[start % 5].className = 'btn';
			if (start != 0) {
				btns[(start - 1) % 5].className = 'btn-on';
			} else {
				btns[4].className = 'btn-on';
			}
		}
	}();

	! function arrownext() {
		an[0].onclick = function() {
			var n = 600;
			var speed = 20;
			var start;
			! function animat() {
				n -= speed;
				if (n >= 0) {
					sl[0].style.marginLeft = parseInt(getComputedStyle(sl[0], ).marginLeft) - speed + 'px';
					setTimeout(function() {
						animat()
					}, 10);
				}
				if (parseInt(sl[0].style.marginLeft + 0) == -3600) {
					sl[0].style.marginLeft = '-600px';
				}
			}();

			for (var i = 0; i < btns.length; ++i) {
				if (btns[i].className == 'btn-on') {
					start = i;
				}
			}
			btns[start % 5].className = 'btn';
			if (start % 5 != 4) {
				btns[start % 5 + 1].className = 'btn-on';
			} else {
				btns[0].className = 'btn-on';
			}
		}
	}();

	! function btn() {
		ubtn[0].onclick = function(ev) {
			if (ev.target.nodeName.toLowerCase() == 'li') {
				var start, dest;
				for (var i = 0; i < btns.length; ++i) {
					if (btns[i].className == 'btn-on') {
						start = i;
					}
					if (btns[i] == ev.target) {
						dest = i;
					}
					btns[i].className = 'btn';
				}
				ev.target.className = 'btn-on';
				var n = 600 * Math.abs(dest - start);
				var speed;
				(dest - start) > 0 ? speed = 20 : speed = -20;
				! function animat() {
					n -= Math.abs(speed);
					if (n >= 0) {
						sl[0].style.marginLeft = parseInt(getComputedStyle(sl[0], ).marginLeft) - speed + 'px';
						setTimeout(function() {
							animat()
						}, 10);
					}
				}();
			}
		}
	}();
}