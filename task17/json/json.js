window.onload = function() {
	var pageState = {
	  nowSelectCity: "北京",
	  nowGraTime: "day"
	}
	alert(typeof(pageState.nowSelectCity));
	alert(pageState['nowSelectCity']);
	for (var q in pageState) {
		alert(typeof(q));
	}
}
