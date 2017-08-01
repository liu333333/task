

	function rotate(degree) {
		var fk = document.getElementById('box');
		fk.style.transform = 'rotate('+(degree)+'deg)';
	}
	/*var button = document.getElementById("start");
	button.onclick = function() {
		rotate(90);
	}*/
	//定义方向和位置这个对象
	var direction = {
		/*//方向1、2、3、4分别表示上下左右
		direct:1,*/
		//left这个属性表示左侧位置
		left:0,
		//top这个属性表示上侧位置
		top:0
	};
	document.onkeydown = function (ev) {
			var oEvent = ev||event;
			if (oEvent.keyCode == 38) {
				//先旋转在赋值
				rotate(0);
				move('vertical','-');
			}
			if (oEvent.keyCode == 40) {
				//先旋转在赋值
				rotate(180);
				move('vertical','+');
			}
			if (oEvent.keyCode == 37) {
				//先旋转在赋值
				rotate(270);
				move('level','-');
			}
			if (oEvent.keyCode == 39) {
				//先旋转在赋值
				rotate(90);
				move('level','+');
			}
	}

	//判断是否过界
	function move(direct,oporate) {
		var fk = document.getElementById('box');
		//判断是水平还是垂直运动
		if (direct == 'level') {
			if (oporate == '+') {
				direction.left += 1;
				if (direction.left > 9) {
					direction.left = 9;
				}

			} else {
				direction.left -= 1;
				if (direction.left < 0) {
					direction.left = 0;
				}
			}
		} else {
			if (oporate == '+') {
				direction.top += 1;
				if (direction.top > 9) {
					direction.top = 9;
				}
			} else {
				direction.top -= 1;
				if (direction.top < 0) {
					direction.top = 0;
				}
			}
		}
		
		fk.style.left = (direction.left)*51 + 'px';
		fk.style.top = (direction.top)*51 + 'px';
	}

