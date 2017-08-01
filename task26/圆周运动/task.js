/**
 * 操作面板
 */
 (function () {
 	var oBtns = document.getElementsByTagName('button');
 	for (var i = 0; i < oBtns.length; i++) {
 		oBtns[i].addEventListener('click',clickButton);
 	}
 	function clickButton() {
 		//通过父节点获取所在轨道
 		var orbitId = this.parentNode.dataset.id - 0;
 		var message = this.dataset.type;
 		switch(message) {
 			case 'create': 	
 				//this.dataset.status == 'create'表示还未创建
 				if (this.dataset.status == 'create') 
 				{
 					this.innerHTML = '毁灭飞船';
 					Commander.createSpaceShip(orbitId);
 					this.dataset.status = 'created';
 					this.nextElementSibling.disabled = false;
 					this.nextElementSibling.nextElementSibling.disabled = false;
 					this.nextElementSibling.nextElementSibling.value =1;
 					this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;


 				} 
 				//表示毁灭
 				else {
 					Commander.destroy(orbitId);
 					this.innerHTML = '创建飞船';
 					this.dataset.status = 'create';
 					this.nextElementSibling.disabled = true;
 					this.nextElementSibling.nextElementSibling.disabled = true;
 					this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
 				}
 				break;
 			case 'drive':
 				//状态为飞行
 				if (this.dataset.status == 'start') {
 					Commander.start(orbitId);
 					this.dataset.status = 'stop';
 					this.innerHTML = '停止';
 				}
 				//状态为停止
 				else 
 				{
 					Commander.stop(orbitId);
 					this.dataset.status = 'start';
 					this.innerHTML = '开始';
 				}
 				break;
 			case 'rate':
 				alert('可以用');
 				var value = this.previousElementSibling.value - 0;
 				Commander.setRate(orbitId,value);
 				break;
 		}
 	}
 })();
 

 //拖动控制面板
 window.onload = function() {
 	(function(){
 		var oDiv = document.getElementById('control');
 		var disX = 0;
		var disY = 0;
		var control = document.getElementById('conPannel');
		control.onmousedown = function(ev) {
			var oEvent =ev||event ;
			disX = oEvent.clientX - oDiv.offsetLeft;
			disY = oEvent.clientY - oDiv.offsetTop;
			document.onmousemove = function(ev) {
				var oEvent =ev||event ;
				var l = oEvent.clientX - disX ;
				var t = oEvent.clientY - disY;
				if (l < 0) {
					l=0;
				} else if (l>(document.documentElement.clientWidth-oDiv.style.offsetWidth)) {
					l = document.documentElement.clientWidth-oDiv.style.offsetWidth;
				}
				if (t<0) {
					t=0;
				}else if (t>document.documentElement.clientHeight-oDiv.style.offsetHeight) {
					t=document.documentElement.clientHeight-oDiv.style.offsetHeight;
				}
				oDiv.style.left = l+ 'px';
				oDiv.style.top = t + 'px';
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			}
			//这个是解决火狐低版本下空div拖拽出bug
			return false;
		}
 	})();
 }

  //拖动消息面板
  window.onload = function() {
  	(function(){
  		var oDiv = document.getElementById('message');
  		var disX = 0;
 		var disY = 0;
 		var control = document.getElementById('conPannel1');
 		control.onmousedown = function(ev) {
 			var oEvent =ev||event ;
 			disX = oEvent.clientX - oDiv.offsetLeft;
 			disY = oEvent.clientY - oDiv.offsetTop;
 			document.onmousemove = function(ev) {
 				var oEvent =ev||event ;
 				var l = oEvent.clientX - disX ;
 				var t = oEvent.clientY - disY;
 				if (l < 0) {
 					l=0;
 				} else if (l>(document.documentElement.clientWidth-oDiv.style.offsetWidth)) {
 					l = document.documentElement.clientWidth-oDiv.style.offsetWidth;
 				}
 				if (t<0) {
 					t=0;
 				}else if (t>document.documentElement.clientHeight-oDiv.style.offsetHeight) {
 					t=document.documentElement.clientHeight-oDiv.style.offsetHeight;
 				}
 				oDiv.style.left = l+ 'px';
 				oDiv.style.top = t + 'px';
 			}
 			document.onmouseup = function() {
 				document.onmousemove = null;
 				document.onmouseup = null;
 			}
 			//这个是解决火狐低版本下空div拖拽出bug
 			return false;
 		}
  	})();
  }

  //获取当地时间
  function getTime() {
  	var date = new Date();
  	var year = date.getFullYear(); //年
  	var month = date.getMonth(); //月
  	var day = date.getDate() ;//日
  	var hh = date.getHours(); //小时
  	var mm = date.getMinutes(); //分钟
  	var ss = date.getSeconds(); //秒
  	var ms = date.getMilliseconds(); //获取毫秒数 0-999
  	var clock = year +'-';

  	if (month <10) {
  		clock += '0';
  	}
  	clock += month + ' ';

  	if (day <10) {
  		clock += '0';
  	}
  	clock += day + ' ';

  	if (hh <10) {
  		clock += '0';
  	}
  	clock += hh + ':';

  	if (mm <10) {
  		clock += '0';
  	}
  	clock += mm + ':';

  	if (ss <10) {
  		clock += '0';
  	}
  	clock += ss + ':';

  	if (ms <100) {
  		clock += '0';
  		if (ms<10) {
  			clock += '0';
  		}
  	}
  	clock += ms;
  	return clock;
  }

  function log(message,color) {
  	var time = getTime();
  	var pannel = document.getElementById('messageDisplay');
  	var p = document.createElement('p');
  	p.innerHTML = time + '  ';
  	var label = document.createElement('label');
  	label.style.color = color;
  	label.innerText = message;
  	p.appendChild(label);
  	pannel.appendChild(p);
  	pannel.scrollTop = pannel.scrollHeight;
  }

  log('test','red');