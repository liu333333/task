var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');

btn1.addEventListener('click',leftEnter);
btn2.addEventListener('click',rightEnter);
btn3.addEventListener('click',leftOut);
btn4.addEventListener('click',rightOut);
var data = new Array();

function leftEnter(value) {
	var value = getValue();
	if (value !='') {
		data.unshift(value);
		render();
	}
}

function rightEnter(value) {
	var value = getValue();
	if (value !='') {
		data.push(value);
		render();
	}
}

function getValue() {
	var value = document.getElementsByTagName('input')[0].value;
	var ts = /^[0-9]{1,}$/;
	if(ts.test(value.trim())) {
		return value;
	} else {
		alert('请重新输入!')
		return '';

	}

}

function leftOut() {
	data.shift();
	render();
}

function rightOut() {
	data.pop();
	render();
}
//画图
function render() {
	var str = '';
	var conElement = document.getElementById('container');
	for (var i = 0; i < data.length; i++) {
		str += '<div>'+data[i] +'</div>';
	}
	conElement.innerHTML = str;
}
//初始化
render();