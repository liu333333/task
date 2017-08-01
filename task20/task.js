var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');


btn1.addEventListener('click',leftEnter);
btn2.addEventListener('click',search);

var allData = [];
var changeData = [];

function leftEnter() {
	var value = document.getElementById('textArea').value.trim();
	if (value == '') {
		alert('不能为空，请重新输入');
	}else if (value !='') {
		var newData = value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		allData = allData.concat(newData);
		alert(newData);
		render(allData);
	}
}

function search() {
	var value = getValue();
	changeData = [];
	if (value !='') {
		for (var i = 0; i < allData.length; i++) {
			changeData[i] = allData[i].replace(value,'<span>'+value+'</span>');
		}
		render(changeData);
	}
}

function getValue() {
	var value = document.getElementsByTagName('input')[0].value.trim();
	var ts = /^[0-9]{1,}$/;
	if(value.length != 0) {
		return value;
	} else {
		alert('请重新输入!')
		return '';

	}

}

//画图
function render(data) {
	var str = '';
	var conElement = document.getElementById('container');
	for (var i = 0; i < data.length; i++) {
		str += '<div>'+data[i] +'</div>';
	}
	conElement.innerHTML = str;
}
//初始化
render();