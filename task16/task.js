/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	/*
	用途：检查输入字符串是否只由汉字、字母、数字组成
	输入：
	value：字符串
	返回：
	如果通过验证返回true,否则返回false
	
	function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
	var re = new RegExp(regu);
	if (re.test(s)) {
	return true;
	}else{
	return false;
	}
	}
	*/
	var name = document.getElementById("aqi-city-input").value.trim();
	var regu1 = "^[a-zA-Z\u4e00-\u9fa5]+$";
	var re1 = new RegExp(regu1);
	if (!re1.test(name)) {
		alert('您输入的城市格式不对，请重新输入');
		return false;
	}
	/*
	用途：检查输入对象的值是否符合整数格式
	输入：str 输入的字符串
	返回：如果通过验证返回true,否则返回false
	
	function isInteger( str ){
	var regu = /^[-]{0,1}[0-9]{1,}$/;
	return regu.test(str);
	}
	*/
	var value = document.getElementById("aqi-value-input").value.trim();
	var regu2 = /^[-]{0,1}[0-9]{1,}$/;
	var re2 = new RegExp(regu2);
	if ( !re2.test(value)) {
		alert('您输入的空气质量应该为整数，请重新输入');
		return false;
	}
	aqiData[name] = value;
	alert(name);
	alert(aqiData[name]);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var oTable = document.getElementById('aqi-table');
	/**
		清空原来table里面的内容
	*/
	var num = oTable.rows.length;
	for (var i = 0; i < num; i++) {
		oTable.deleteRow(i);
		num = num -1;
		i = i-1;
	}
	//var trElement = document.createElement('tr');
	//var td = document.createElement('td') ;
	    //var tbElement = document.createElement('tbody');
	    //oTable.appendChild(tbElement);
	    var trElement = document.createElement('tr');
	    var tdElement1 = document.createElement('td') ;
	    var textE1 = document.createTextNode("城市") ;
	    tdElement1.appendChild(textE1);
	    trElement.appendChild(tdElement1);
	    var tdElement2 = document.createElement('td') ;
	    var textE2 = document.createTextNode('空气质量') ;
	    tdElement2.appendChild(textE2);
	    trElement.appendChild(tdElement2);
	    var tdElement3 = document.createElement('td') ;
	    var textE3 = document.createTextNode('操作') ;
	    tdElement3.appendChild(textE3);
	    trElement.appendChild(tdElement3);
	    
	    oTable.appendChild(trElement);
	    
	    /*
	    *for(var p in myJson){//遍历json对象的每个key/value对,p为key
  			 alert(p + " " + myJson[p]);
			}
	    */
		for (var p in aqiData) {
			var trElement = document.createElement('tr');
			var tdElement1 = document.createElement('td') ;
			var textE1 = document.createTextNode(p) ;
			tdElement1.appendChild(textE1);
			trElement.appendChild(tdElement1);
			var tdElement2 = document.createElement('td') ;
			var textE2 = document.createTextNode(aqiData[p]) ;
			tdElement2.appendChild(textE2);
			trElement.appendChild(tdElement2);
			var butElemnt = document.createElement('button') ;
			var textE3 = document.createTextNode('删除') ;
			butElemnt.appendChild(textE3);
			trElement.appendChild(butElemnt);
			oTable.appendChild(trElement);
			/** str += '<tr>'+
	      '<td>'+p+'</td><td>'+aqiData[p]+'</td><td><button>'+删除+'</button></td>'+
	    '</tr>';
	    */
		}
		//alert(str);
		//oTable.innerHTML = str;
		init();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	alert('test');
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  alert('test');
  delete aqiData[this.parentNode.firstChild.firstChild.nodeValue];
  renderAqiList();
}

function init() {
  document.getElementById('add-btn').onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var btn = document.getElementById('aqi-table');
  var btnEles = btn.getElementsByTagName('button');
  for (var i = 0; i < btnEles.length; i++) {
  	alert(btnEles.length);
  	btnEles[i].onclick = delBtnHandle;
  }
}

init();