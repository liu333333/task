window.onload = function () {
	var oButton = document.getElementsByTagName('button')[0];
	var oForm = document.getElementsByTagName('form')[0];
	//alert(oForm);
	oButton.onclick = function() {

		var text = document.getElementById('text1');
		var tip = getByClassName(oForm,'tip');
		var textString = text.value;
		if (textString.length > 16 || textString.length <4) {
			tip.innerText = '姓名输入错误';
			tip.className = 'tip error';
		} else {
			tip.innerText = '输入正确';
			tip.className = 'tip right';
		}

	}
}
function getByClassName(oParent,sClass) {
	var elements = oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var aResults = [];
	for (var i = 0; i < elements.length; i++) {
		if(re.test(elements[i].className)) {
			aResults.push(elements[i]);
		}
		/*alert(elements.className);*/
	}
	return aResults[0];
}