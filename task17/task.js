/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  alert('graTimeChange');
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime!=this.value) {
    // 设置对应数据
    pageState.nowGraTime = this.value;
    alert(pageState.nowGraTime);
    //初始化图表需要的数据格式
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  alert('citySelectChange');
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity != this.value) {
    // 设置对应数据
    pageState.nowSelectCity=this.value;
    alert(pageState.nowSelectCity);
    //初始化图表需要的数据格式
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
  
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputElements = document.getElementsByTagName('input');
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('click',graTimeChange);
  }
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityElement = document.getElementById('city-select');
  var cityList ='';
  for (var q in aqiSourceData) {
    cityList += '<option>' + q +'</option>';
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  /* 
   * addEventHandler:监听Dom元素的事件 
   *  
   * target：监听对象 
   * type：监听函数类型，如click,mouseover 
   * func：监听函数 
   */
   cityElement.innerHTML = cityList;
   cityElement.addEventListener('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  /* 数据格式演示
  var aqiSourceData = {
    "北京": {
      "2016-01-01": 10,
      "2016-01-02": 10,
      "2016-01-03": 10,
      "2016-01-04": 10
    }
  };
  */
  // 将原始的源数据处理成图表需要的数据格式
  chartData = {};
  alert(pageState.nowSelectCity);
  alert(pageState.nowGraTime);
  var data = aqiSourceData[pageState.nowSelectCity];
  if (pageState.nowGraTime=='day') {
    // 处理好的数据存到 chartData 中
    chartData = data;
  } else if (pageState.nowGraTime=='week')  {
    var i = 0;
    var sum = 0;
    var week = 1;
    for (var q in data) {
      var date = new Date(q) ;
      //date.getDay()
      //返回值是 0（周日） 到 6（周六） 之间的一个整数。
      if(date.getDay() != 0) {
        sum += data[q];
        i++;
      } else {
        chartData['第'+week+'周']=Math.round(sum/(i+1));
        i=0;
        sum =0 ;
        week +=1;
      }
    }
    if (sum!=0) {
        chartData['第'+week+'周']=Math.round(sum/(i+1));
    }
  } else {
    var i = 0;
    var sum = 0;
    var mouth = 0;
    for (var q in data) {
      var date = new Date(q) ;
      //dateObject.getMonth()
      //dateObject 的月份字段，使用本地时间。
      //返回值是 0（一月） 到 11（十二月） 之间的一个整数。
      if(date.getMonth() == mouth) {
        sum += data[q];
        i++;
      } else {
        mouth +=1;
        chartData['第'+mouth+'月']=Math.round(sum/(i+1));
        i=0;
        sum =0 ;
      }
    }
    if (sum!=0) {
        chartData['第'+mouth+'月']=Math.round(sum/(i+1));
    }
  }
}

/**
 * 渲染图表
 */
function renderChart() {
  var chartElement = document.getElementsByClassName('aqi-chart-wrap')[0];
  //document.getElementsByClassName('aqi-chart-wrap')[0]
  var str = '';
  for (var q in chartData) {
    var color =  '#'+(Math.random()*0xffffff<<0).toString(16) ;
    str += '<div title="'+q+' :'+chartData[q] +'" style="height:'+chartData[q]+'px;background-color:'+color+'"></div> ' ;
  }
  alert(str);
  chartElement.innerHTML= str;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();