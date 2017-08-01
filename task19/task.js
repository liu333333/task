var array = new Array(60);

var sub = document.getElementById('sub');
var rand = document.getElementById('rand');
var maopao = document.getElementById('maopao');
var oDivContainer = document.getElementById('container');

sub.addEventListener('click',setNum);
rand.addEventListener('click',getRandNum);
maopao.addEventListener('click',maoOrder);
insertOrder.addEventListener('click',insOrder);

function setNum() {
	var num = document.getElementsByTagName('input')[0].value;
	if (isNaN(num)) {
		alert('请输入10-100之间的正整数');
	} else if (num<10 || num>100) {
		alert('请输入10-100之间的正整数');
	} else if (num.length>=60) {
		alert('数字超过60个');
	}else if (num.length <60) {
		array.push(num);
		alert(num);
	}
	alert(array);
	init();
}
function getRandNum() {
	array.length = 0;
	//随机生成剩余的数字
	for (var i = 0; i < 60; i++) {
		var number = Math.floor(Math.random() * 90 + 10);
		//alert(number);
		array.push(number);
	}
	alert(array);
	init();
}

function maoOrder() {
	for (var i = 0; i < array.length; i++) {
		var j = i-1;
		var key = array[i];
		while(j>0 && array[j]>key) {
			array[j+1] = array[j];
			j--;
		}
		array[j] = key;
	}
	alert(array);
	init();
}

function init() {
	var str = '';
	for (var i = 0; i < array.length; i++) {
		var color =  '#'+(Math.random()*0xffffff<<0).toString(16) ;
		str += '<div title="'+array[i]+'" style="height:'+array[i]*5+'px;background-color:'+color+';width:'+(100/array.length)+'%"></div>';
	}
	oDivContainer.innerHTML = str;
}

init();