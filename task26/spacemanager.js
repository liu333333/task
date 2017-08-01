/**
 * 宇宙管理员（上帝）
 */
 var spaceManager = {
    // 宇宙管理员（上帝）的记事本
    noteBook:{
    	//飞船列表
    	spaceShipList:[],
    	//飞船飞行管理ID
    	spaceShipFlyManager:0,
    	//太阳能管理ID
    	solarManager: 0
    },
    /**
     * 创建宇宙飞船
     * @param orbitId 轨道ID
     */
     createSpaceship:function (orbitId) {
     	 //创建飞船对象并保存到数组
     	 var spaceShipId = this.noteBook.spaceShipList.push(new SpaceShip(orbitId));
     	 //创建飞船主体div
     	 var spaceshipDiv = document.createElement('div');
     	 oDiv.id = 'spaceship' + spaceShipId;
     	 oDiv.className = 'space-ship orbit-ship' + spaceShipId;
     	 //创建能量条div
     	 var energyDiv = document.createElement("div");
     	 energyDiv.className = "energy";
     	 spaceshipDiv.appendChild(energyDiv);
     	 //创建能量文本div
     	 var textDiv = document.createElement("div");
     	 textDiv.className = "text";
     	 textDiv.innerHTML = "100%";
     	 spaceshipDiv.appendChild(textDiv);
     	 //将飞船显示到页面上
     	 document.body.appendChild(spaceshipDiv);
     },
     //无线电，向宇宙中的飞船广播消息
     Mediator: {
         /**
          * 发送消息
          * @param message 消息
          */
          sendMessage:function(message) {
          	//1秒后发送消息
          	setTimeout(function() {
          		//一定概率（30%）丢包
          		if (Math.random() <=0.3) {
          			log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
          			return;
          		}
          		log("向轨道" + (message.id + 1) + "发送 " + message.command + " 指令成功！", "green");
          		for (var i = 0; i < spaceManager.noteBook.spaceShipList.length; i++) {
          			//已销毁的飞船不处理
          			if(spaceManager.noteBook.spaceShipList[i]._destroyed) {
          				continue;
          			}
          			spaceManager.noteBook.spaceShipList[i].telegraph.sendMessage(message);
          		}
          	},1000);
          },
          /**
         * 创建宇宙飞船
         * @param orbitId 轨道ID
         */
         createSpaceship:function(orbitId) {
         	//1秒后发送创建飞船消息
         	setTimeout(function(){
         		 //一定概率（30%）丢包
         		 if (Math.random <=0.3) {
         		 	log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
         		 	return;
         		 }
         		 log('向轨道' +(orbitId + 1) +'发送的 create 指令成功！','green');
         		 spaceManager.createSpaceship(orbitId);
         		
         	},1000);
         }
      },
   };

//飞船飞行及显示管理
(function() {
	spaceManager.noteBook.spaceShipFlyManager = setInterval(function(){
		 /*//Mozilla内核浏览器：firefox3.5+
		 -moz-transform: rotate | scale | skew | translate ;
		//Webkit内核浏览器：Safari and Chrome
		 -webkit-transform: rotate | scale | skew | translate ;
		//Opera
		 -o-transform: rotate | scale | skew | translate ;
		//IE9
		 -ms-transform: rotate | scale | skew | translate ;
		//W3C标准
		 transform: rotate | scale | skew | translate ;*/
	},100);
})();