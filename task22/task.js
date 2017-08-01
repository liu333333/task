window.onload = function() {
		var oDiv = document.getElementById('main');
		//alert(oDiv.children.length);
		var btn1 = document.getElementById('btn1');
		var btn2 = document.getElementById('btn2');
		var btn3 = document.getElementById('btn3');
		var timer = null;//定时器
		var divList = [];
		btn1.onclick = function () {
			reset();
			preOrder(oDiv);
			alert(divList.length);
			changeColor();
		}
		btn2.onclick = function () {
			reset();
			inOrder(oDiv);
			alert(divList.length);
			changeColor();
		}
		btn3.onclick = function () {
			reset();
			postOrder(oDiv);
			alert(divList.length);
			changeColor();
		}


		function preOrder(node) {
			if (!(node== null)) {
				divList.push(node);
				preOrder(node.firstElementChild);
				preOrder(node.lastElementChild);
			}
		}
		function inOrder(node) {
			if (!(node== null)) {
				preOrder(node.firstElementChild);
				divList.push(node);
				preOrder(node.lastElementChild);
			}
		}
		function  postOrder(node) {
			if (!(node== null)) {
				preOrder(node.firstElementChild);
				preOrder(node.lastElementChild);
				divList.push(node);
			}
		}




		function changeColor() {
			var i = 0;
			divList[i].style.backgroundColor = 'blue';
			
			timer = setInterval(function(argument) {
				i++;
				if (i<divList.length) {
					divList[i].style.backgroundColor = 'blue';
					divList[i-1].style.backgroundColor = '#fff';
				} else {
					clearInterval(timer);
					divList[i-1].style.backgroundColor = '#fff';
				}
			},1000);
		}
		function reset() {
			divList = [];
			clearInterval(timer);
			//让所有的div的背景颜色全部变成白色的
			var divs = oDiv.getElementsByTagName('div');
			oDiv.style.backgroundColor = '#fff';
			for (var i = 0; i < divs.length; i++) {
				divs[i].style.backgroundColor = '#fff';
			}

		}
	}