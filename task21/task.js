var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var oTxt = document.getElementsByTagName('input')[0];

btn1.addEventListener('click',leftEnter);

var allData = [];
var tagData = [];

function leftEnter() {
	var oTarget = document.getElementById('textArea');
	var value = getValue(oTarget);
	if (value == '') {
		alert('不能为空，请重新输入');
	}else if (value !='') {
		var newData = value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		//allData = allData.concat(newData);
		alert(newData);
		isdelete(allData,newData);
		var container = document.getElementById('container');
		render(allData,container);
	}
}

oTxt.onkeydown = function(ev) {
	var oEvent = ev||event;
	//空格32 逗号 188 回车键 13
	if (oEvent.keyCode == 32 ||oEvent.keyCode == 188 ||oEvent.keyCode == 13) {
		var oTarget = document.getElementById('input1');
		var value = getValue(oTarget);
		if (value.length == 0) {
			alert('请重新输入');
		} else {
			var data = [];
			data.push(value);
			isdelete(tagData,data);
		}
	}
	var container = document.getElementById('container1')
	render(tagData,container);
}

//得到值，并判断输入是否为空值
function getValue(oTarget) {
	var value = oTarget.value.trim();
	if(value.length != 0) {
		return value;
	} else {
		alert('请重新输入!')
		return '';
	}
}

//判断数组长度是否大于10个，大于十个的时候按照按照录入的先后顺序，把最前面的删掉
function isdelete(dataAll,data) {
	var length1 =dataAll.length + data.length ;
	if (length1>10) {
		var deleteLength = length1 -10;
		//该逻辑实现把多余的元素进行删除
		for (var i = 0; i < deleteLength; i++) {
			dataAll.shift();
		}
	}
	//该逻辑实现把所有的元素添加到原来队列里面
	for (var i = 0; i < data.length; i++) {
		dataAll.push(data[i]);
	}
}

//画图
function render(data,container) {
	var str = '';
	//var conElement = document.getElementById('container');
	for (var i = 0; i < data.length; i++) {
		str += '<div>'+data[i] +'</div>';
	}
	container.innerHTML = str;
}
//初始化
render();
alert('test');