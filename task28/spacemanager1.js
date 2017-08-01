//指挥官
var SpaceShipManager = {
	//用于记录
	noteBook : {
		spaceShipList : [],
		spaceFlyManager : 0,
		solorManager : 0
	},
	//创建宇宙飞船
	//orbitId表示在哪个轨道创建
	//轨道值从0开始
	createSpaceShip : function (orbitId) {
		//这里改变能源以及动力类型

		var oParameters = document.getElementsByClassName('ordit'+(orbitId+1))[0];
		//alert(oParameters.innerHTML);
		var oParameter1 = oParameters.getElementsByTagName('select')[0];
		//alert(oParameter1);
		var index1 = oParameter1.selectedIndex; // // 选中索引
		var text1 = oParameter1.options[index1].text; // 选中文本
		/*var value = obj.options[index].value; // 选中值*/
		//截取字符串中的数字
		var model1 =text1.slice(0,3) ;
		var rate1 = text1.slice(8,10)-0;
		var consume1 = text1.slice(17,18)-0 ;

		var oParameter2 = oParameters.getElementsByTagName('select')[1];
		var index2 = oParameter2.selectedIndex; // // 选中索引
		var text2 = oParameter2.options[index2].text; // 选中文本
		/*var value = obj.options[index].value; // 选中值*/
		//截取字符串中的数字
		//alert(text2);
		var model2 =text2.slice(0,3) ;
		var add2 = text2.slice(12,13) -0;
		log("速度："+rate1 + "能源消耗速度" + consume1+"添加能源速度"+add2);
		this.noteBook.spaceShipList.push(new SpaceShip(orbitId,rate1,consume1,add2));

		var oDiv = document.createElement('div');
		oDiv.id = 'spaceship' + orbitId;
		oDiv.className = 'spaceship spaceship' + orbitId;
		var oEnengy = document.createElement('div');
		oEnengy.className = 'energy';
		var txt = document.createElement('div');
		txt.className = 'txt';
		txt.innerHTML = '能量值：100%';
		oEnengy.appendChild(txt);
		oDiv.appendChild(oEnengy);
		document.body.appendChild(oDiv);
	},
	
	/*//废弃的无线电发射设备无线电
	Mediator: {
		sendMessage : function(message) {
			
			//每次信息正常传送的时间需要1秒
			setTimeout(function() {
				//在发射过程中，有30%的信息传送失败（丢包）概率
				if (Math.random() <= 0.3) {
					log('向轨道'+(message.id+1)+'信息传送失败（丢包）命令：'+message.command,'red');
					return;
				}
				log('向轨道'+(message.id+1)+'信息传送成功：'+message.command,'green');
				for (var i = 0; i < SpaceShipManager.noteBook.spaceShipList.length; i++) {
					//如果飞船被毁坏掉，那么不予处理
					if(SpaceShipManager.noteBook.spaceShipList[i]._destroy) {
						continue;
					}
					SpaceShipManager.noteBook.spaceShipList[i].telegraph.sendMessage(message);
				}

			},1000);
		},
		//信号接收，创建宇宙飞船
		createSpaceShip : function(orbitId) {
			setTimeout(function(){
				//在发射过程中，有30%的信息传送失败（丢包）概率
				if (Math.random() <= 0.3) {
					log('命令发送失败,在轨道'+(orbitId+1) +'创建失败','red');
					return;
				}
				//创建飞船信息发送成功
				log('创建飞船信息发送成功,在轨道'+(orbitId+1) +'创建成功','green');
				SpaceShipManager.createSpaceShip(orbitId);
			},1000);
		}
	}
};*/
//新的无线电设备
Bus:{
	sendMessage : function(message) {
		var timer = null;
		var isSend = false;
		var msg =SpaceShipManager.Bus.Adapter.decoder(message) ;
		var timer = setInterval(function(){
			
			if (Math.random() <= 0.1) {
					log('向轨道'+(msg.id+1)+'信息传送失败（丢包）命令：'+msg.command,'red');
					log('正在重试！','green');
					//return;
			} else {
				isSend = true ;
				if (msg.command == 'create') {
					//创建飞船信息发送成功
					log('创建飞船信息发送成功,在轨道'+(msg.id+1) +'创建成功','green');
					SpaceShipManager.createSpaceShip(msg.id);
				} else {
					log('向轨道'+(msg.id+1)+'信息传送成功：'+msg.command,'green');
					for (var i = 0; i < SpaceShipManager.noteBook.spaceShipList.length; i++) {
						//如果飞船被毁坏掉，那么不予处理
						if(SpaceShipManager.noteBook.spaceShipList[i]._destroy) {
							continue;
						}
						SpaceShipManager.noteBook.spaceShipList[i].telegraph.sendMessage(message);
					}
				}
			}
			//判断信息是否发射出去
			if (isSend) {
				//如果发射出去，关闭定时器
				clearInterval(timer);
			}
			
		},300);
	},
/*	createSpaceShip : function(orbitId) {
		var timer = null;
		var isSend = false;
		timer = setInterval(function(){
			
			//在发射过程中，有30%的信息传送失败（丢包）概率
			if (Math.random() <= 0.1) {
				log('命令发送失败,在轨道'+(orbitId+1) +'创建失败','red');
				log('正在重试！','green');
				//return;
			} else {
				isSend = true;
				
			}
			
			//判断信息是否发射出去
			if (isSend) {
				//如果发射出去，关闭定时器
				clearInterval(timer);
			}
		},300);
	},*/
	Adapter: {
		/**
		 * 编码器
		 * @param receiver 接收者
		 * @param message 消息
		 * @returns {string} 编码后的数据
		 */
		encoder:function(message) {
			var str = '';
			switch(message.id.toString()) {
				case '0' :
					str+= '0000';
					break;
				case '1' :
					str+= '0001';
					break;
				case '2' :
					str+= '0010';
					break;
				case '3' :
					str+= '0011';
					break;
			}
			switch(message.command) {
				case 'destroy':
					str += '1100';
					break;
				case 'start' :
					str += '0001';
					break;
				case 'stop':
					str += '0010';
					break;
				case 'create' :
					str += '0110';
					break;
			}
			return str;
		},
		/**
		 * 解码器
		 * @param data 编码后的数据
		 * @returns {*}
		 */
		 decoder:function(message) {
		 	var enMessage ={};
		 	var id = message.slice(0,4);
		 	switch(id) {
		 		case '0000':
		 			enMessage.id = 0;
		 			break;
		 		case '0001':
		 			enMessage.id = 1;
		 			break;
		 		case '0010':
		 			enMessage.id = 2;
		 			break;
		 		case '0011' :
		 			enMessage.id = 3;
		 			break;
		 	}
		 	var command = message.slice(4,8);
		 	switch(command) {
		 		case '1100':
		 			enMessage.command = 'destroy';
		 			break;
		 		case '0001' :
		 			enMessage.command = 'start'
		 			break;
		 		case '0010':
		 			enMessage.command = 'stop';
		 			break;
		 		case '0110' :
		 			enMessage.command = 'create';
		 			break;
		 	}
		 	return enMessage;
		 }
	}
	}

};

//飞船飞行及显示管理
(function(){
	SpaceShipManager.noteBook.spaceFlyManager = setInterval(function(){
		for (var i = 0; i < SpaceShipManager.noteBook.spaceShipList.length; i++) {
			if(SpaceShipManager.noteBook.spaceShipList[i]._destroy) {
				if (!SpaceShipManager.noteBook.spaceShipList.clear) {
					SpaceShipManager.noteBook.spaceShipList.clear = true;
					var ship = document.getElementById('spaceship'+SpaceShipManager.noteBook.spaceShipList[i]._orbitId);
					document.body.removeChild(ship);
				}
				continue;
			}
			SpaceShipManager.noteBook.spaceShipList[i].drive.fly();
			var ship = document.getElementById('spaceship'+SpaceShipManager.noteBook.spaceShipList[i]._orbitId);
			var energyDiv = ship.getElementsByClassName('energy')[0];
			var txt = energyDiv.getElementsByClassName('txt')[0];

			ship.style.transform = 'rotate('+SpaceShipManager.noteBook.spaceShipList[i]._angle+'deg)';
			ship.style.oTransform = 'rotate('+SpaceShipManager.noteBook.spaceShipList[i]._angle+'deg)';
			ship.style.msTransform = 'rotate('+SpaceShipManager.noteBook.spaceShipList[i]._angle+'deg)';
			ship.style.mozTransform = 'rotate('+SpaceShipManager.noteBook.spaceShipList[i]._angle+'deg)';
			ship.style.webkitTransform = 'rotate('+SpaceShipManager.noteBook.spaceShipList[i]._angle+'deg)';
			energyDiv.style.width = SpaceShipManager.noteBook.spaceShipList[i].energy.get() +'px';
			txt.innerHTML='能量：' + SpaceShipManager.noteBook.spaceShipList[i].energy.get() +'%';
				
		
		}
	},100);
})();
//太阳能管理
(function(){
	SpaceShipManager.noteBook.solorManager = setInterval(function(){
		for (var i = 0; i < SpaceShipManager.noteBook.spaceShipList.length; i++) {
			//对已销毁的宇宙飞船不作处理
			if(SpaceShipManager.noteBook.spaceShipList[i]._destroy) {
				continue;
			}
			SpaceShipManager.noteBook.spaceShipList[i].energy.add();
			SpaceShipManager.noteBook.spaceShipList[i].energy.consume();
			//飞船在停止飞行状态并且能量值满的话，按钮变化为飞行
			if (SpaceShipManager.noteBook.spaceShipList[i]._status == 0) {
				if (SpaceShipManager.noteBook.spaceShipList[i].energy.get() == 100) {
					var oOrdit = document.getElementsByClassName('ordit'+(SpaceShipManager.noteBook.spaceShipList[i]._orbitId+ 1))[0];
					var oBtn = oOrdit.getElementsByTagName('button')[1];
					oBtn.innerHTML = '飞行';
					oBtn.dataset.status = 'start';
				}
			}
			//飞船在飞行状态按钮变化为停止
			if (SpaceShipManager.noteBook.spaceShipList[i]._status == 1) {
					var oOrdit = document.getElementsByClassName('ordit'+(SpaceShipManager.noteBook.spaceShipList[i]._orbitId+ 1))[0];
					var oBtn = oOrdit.getElementsByTagName('button')[1];
					oBtn.innerHTML = '停止';
					oBtn.dataset.status = 'stop';
			}
		}
	},1000);
})();
