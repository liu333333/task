/**
 * 宇宙管理员（上帝）
 */
 var SpaceManager = {
 	// 宇宙管理员（上帝）的记事本
 	notebook:{
 		//飞船列表
 		spaceShipList:[],
 		//飞船飞行管理ID
 		spaceFlyManager:0,
 		//太阳能管理ID
 		solarManager: 0
 	},
 	/**
     * 创建宇宙飞船
     * @param orbitId 轨道ID
     */
     creatSpaceShip:function (orbitId) {
     	//新建一个飞船
        alert(new SpaceShip(orbitId));
     	//var shipId = this.notebook.spaceShipList.push(new SpaceShip(orbitId));
     	//创建飞船的主体
     	var ship = document.createElement('div');
     	ship.className = 'spaceship spaceship' + orbitId;
     	//创建能量条
     	var energy = document.createElement('div') ;
     	energy.className = 'energy';
     	//创建文字提示
     	var txt = document.createElement('div');
     	txt.className = 'txt';
     	txt.innerHTML = 'energy:100%';
     	energy.appendChild(txt);
     	ship.appendChild(energy);
     	document.body.appendChild(ship);
     },
     //无线电，向宇宙中的飞船广播消息
    Mediator: {
        /**
         * 发送消息
         * @param message 消息
         */
         sendMessage:function(message) {
         	//1秒后发送消息
         	setTimeout(function(){
         		//一定概率（30%）丢包
         		if (Math.random() <= 0.3) {
         			//log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
         		}
         		//log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令成功！", "green");
         		//像每个飞船发送信息
         		for (var i = 0; i < SpaceManager.notebook.spaceShipList.length; i++) {
         			if(SpaceManager.notebook.spaceShipList[i]._destroyed) {
         				continue;
         			}
         			SpaceManager.notebook.spaceShipList[i].sendMessage(message);
         		}
         	},1000);
         },
         /**
         * 创建宇宙飞船
         * @param orbitId 轨道ID
         */
         creatSpaceShip:function(orbitId) {
         	//1秒后发送创建飞船消息
         	setTimeout(function(){
         		//一定概率（30%）丢包
         		if (Math.random() <=0.3) {
         			//log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
         			return;
         		}
         		//log("向轨道" + (orbitId + 1) + "发送的 create 指令成功！", "green");
         		SpaceManager.creatSpaceShip(orbitId);
         	},1000);
         },
     },
 };
 //飞船飞行及显示管理
(function() {
	//由 setInterval() 返回的 ID(整数)值可用作 clearInterval(ID) 方法的参数。
	SpaceManager.notebook.spaceFlyManager = setInterval(function(){
		for (var i = 0; i < SpaceManager.notebook.spaceShipList.length; i++) {
			//飞船毁灭不做处理
			if(SpaceManager.notebook.spaceShipList[i]._destroyed) {
				//在界面删除毁灭的飞船
				if(!SpaceManager.notebook.spaceShipList[i]._clear) {
					SpaceManager.notebook.spaceShipList[i]._clear = true;
				    document.body.removeChild(document.getElementById("spaceship" + (i + 1)));
                }
				continue;
			}
			//飞船飞行控制
			SpaceManager.notebook.spaceShipList[i].drive.start();
			//飞船Div
			var ship = document.getElementsByClassName('spaceship'+(i+1));
			//让飞船转动
			ship.style.transform = 'rotate('+SpaceManager.notebook.spaceShipList[i]._angle+'deg)';
			ship.style.oTransform = 'rotate('+SpaceManager.notebook.spaceShipList[i]._angle+'deg)';
			ship.style.msTransform = 'rotate('+SpaceManager.notebook.spaceShipList[i]._angle+'deg)';
			ship.style.mozTransform = 'rotate('+SpaceManager.notebook.spaceShipList[i]._angle+'deg)';
			ship.style.webkitTransform = 'rotate('+SpaceManager.notebook.spaceShipList[i]._angle+'deg)';
			var energy = ship.getElementsByClassName('energy')[0];
			energy.style.width = SpaceManager.notebook.spaceShipList[i].energy.get() + '%';
			var txt = energy.getElementsByClassName('txt')[0];
			txt.innerHTML = SpaceManager.notebook.spaceShipList[i].energy.get() + '%';

		}
	},100);
})();
//太阳能管理
(function() {
	SpaceManager.notebook.solarManager = setInterval(function(){
		for (var i = 0; i < SpaceManager.notebook.spaceShipList.length; i++) {
			//对于销毁的宇宙飞船不做处理
			if(SpaceManager.notebook.spaceShipList[i]._destroyed) {
				continue;
			}
			//太阳能充能系统
			SpaceManager.notebook.spaceShipList[i].energy.add(2);
			//飞行耗能
			SpaceManager.notebook.spaceShipList[i].energy.consume(5);
		}
	},100);
})();