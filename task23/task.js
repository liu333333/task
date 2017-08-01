window.onload = function() {
		var oDiv = document.getElementById('main');
		//alert(oDiv.children.length);
		var btn1 = document.getElementById('btn1');
		var btn2 = document.getElementById('btn2');
		var btn3 = document.getElementById('btn3');
		var btn4 = document.getElementById('btn4');
		var timer = null;//定时器
		var divList = [];
		var zhanList = [];
		//队列：先进先出，在队头做删除，在队尾做插入
		btn1.onclick = function () {
			reset();
			//把根节点放至栈里面
			//栈：先进先出，在栈顶做删除和插入
			zhanList.push(oDiv);
			deepOrder(oDiv);
			alert(divList.length);
			changeColor();
		}
		btn2.onclick = function () {
			reset();
			zhanList.push(oDiv);
			guangOrder(oDiv);
			alert(divList.length);
			changeColor();
		}
		btn3.onclick = function () {
			reset();
			//把根节点放至栈里面
			//栈：先进先出，在栈顶做删除和插入
			zhanList.push(oDiv);
			var input1 = document.getElementById('input1').value;
			var node = deepCha(oDiv,input1);
			if (getString(divList[(divList.length-1)]).toLowerCase().indexOf(input1.toLowerCase()) != -1) {
				changeColor1();
			} else {
				alert(divList.length);
				changeColor();
				alert('您查找的内容不存在，请重新输入！');
			}
			
		}
		btn4.onclick = function () {
			reset();
			//把根节点放至栈里面
			//栈：先进先出，在栈顶做删除和插入
			zhanList.push(oDiv);
			var input1 = document.getElementById('input1').value;
			var node = guangCha(oDiv,input1);
			if (getString(divList[(divList.length-1)]).toLowerCase().indexOf(input1.toLowerCase()) != -1) {
				changeColor1();
			} else {
				alert(divList.length);
				changeColor();
				alert('您查找的内容不存在，请重新输入！');
			}
		}


		function deepOrder(node) {

			if (zhanList.length != 0) {
				zhanList.pop(); //把这个节点从栈顶中删除
				if (!(node== null)) {
					divList.push(node);
					var allNode = node.children;
					for (var i = (allNode.length-1); i > -1; i--) {
						zhanList.push(allNode[i]); //把这个节点的子元素从右至左进栈
					}
				}
				deepOrder(zhanList[zhanList.length-1]);
			}
		}
		function deepCha(node,str1) {

			if (zhanList.length != 0) {
				if (getString(node).toLowerCase().indexOf(str1.toLowerCase()) != -1) {
					divList.push(node);
					return ;
				}
				zhanList.pop(); //把这个节点从栈顶中删除
				if (!(node== null)) {
					divList.push(node);
					var allNode = node.children;
					for (var i = (allNode.length-1); i > -1; i--) {
						zhanList.push(allNode[i]); //把这个节点的子元素从右至左进栈
					}
				}
				deepCha(zhanList[zhanList.length-1],str1);
			}
		}
		function guangOrder(node) {
			if (zhanList.length != 0) {
				zhanList.shift(); //把这个节点从队列头中删除
				if (!(node== null)) {
					divList.push(node);
					var allNode = node.children;
					for (var i = 0; i < allNode.length; i++) {
						zhanList.push(allNode[i]); //把这个节点的子元素从左至右进队列
					}
				}
				guangOrder(zhanList[0]);
			}
		}
		function  guangCha(node,str1) {
			if (zhanList.length != 0) {
				if (getString(node).toLowerCase().indexOf(str1.toLowerCase()) != -1) {
					divList.push(node);
					return ;
				}
				zhanList.shift(); //把这个节点从队列头中删除
				if (!(node== null)) {
					divList.push(node);
					var allNode = node.children;
					for (var i = 0; i < allNode.length; i++) {
						zhanList.push(allNode[i]); //把这个节点的子元素从左至右进队列
					}
				}
				guangCha(zhanList[0],str1);
			}
		}


		function getString(node) {
			var str=node.innerHTML;
			var endindex =str.indexOf('<div'); //避免<div class="third">
			if (endindex == -1) {
				endindex = str.length;
			}
			str = str.slice(0,endindex);
			//alert('从node里面获得的str'  + str);
			return str;
		}

		function changeColor() {
			var i = 0;
			divList[i].style.backgroundColor = 'blue';
			
			timer = setInterval(function(argument) {
				i++;
				if (i<divList.length) {
					var color =  '#'+(Math.random()*0xffffff<<0).toString(16) ;
					divList[i].style.backgroundColor = color;
					divList[i-1].style.backgroundColor = '#fff';
				} else {
					clearInterval(timer);
					divList[i-1].style.backgroundColor = '#fff';
				}
			},1000);
		}

		function changeColor1() {
			var i = 0;
			divList[i].style.backgroundColor = 'blue';
			
			timer = setInterval(function(argument) {
				i++;
				if (i<divList.length) {
					var color =  '#'+(Math.random()*0xffffff<<0).toString(16) ;
					divList[i].style.backgroundColor = color;
					divList[i-1].style.backgroundColor = '#fff';
				} else {
					clearInterval(timer);
					divList[i-1].style.backgroundColor = '#f00';
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