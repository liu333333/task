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
          this.previousElementSibling.disabled = false;
 					this.previousElementSibling.previousElementSibling.disabled = false;


 				} 
 				//表示毁灭
 				else {
 					Commander.destroy(orbitId);
 					this.innerHTML = '创建飞船';
 					this.dataset.status = 'create';
 					this.nextElementSibling.disabled = false;
          this.previousElementSibling.disabled = false;
 					this.previousElementSibling.previousElementSibling.disabled = false;
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
var driveSys =[
{ 
  model:'前进号',
  rate:30,
  consume:5
},
{
  model:'奔腾号',
  rate:50,
  consume:7
},
{
  model:'超越号',
  rate:80,
  consume:9
}
] ;
var enengySys =[
{ 
  model:'劲量型',
  rate:2
},
{
  model:'光能型',
  rate:3
},
{
  model:'永久型',
  rate:4
}
] ;

(function(){
  var oControls = document.getElementById('controls');
  var oSelects = oControls.getElementsByTagName('select');
  for (var i = 0; i < oSelects.length; i++) {
    if(oSelects[i].dataset.type == 'drive') {
      for(var j in driveSys) {
        var option = document.createElement('option');
        option.innerHTML = driveSys[j].model + ' (速率：'+driveSys[j].rate+'px/s,能耗'+driveSys[j].consume+'%/s)';
        oSelects[i].appendChild(option);
      }
    } else {
      for(var j in enengySys) {
        var option = document.createElement('option');
        option.innerHTML = enengySys[j].model + ' (补充能源速度：'+enengySys[j].rate+'%/s)';
        oSelects[i].appendChild(option);
      }
    }
    
  }
})();