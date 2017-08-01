/**
 * 指挥官
 */
var commander = {
    //指挥官的记事本
     notebook: {
        //各个轨道的状态
        orbitStatus: [false, false, false, false]
    },
    //创建飞船
    createSpaceShip:function (orbitId) {
    	if (this.notebook.orbitStatus[orbitId]) {
    		//log("轨道" + (orbitId + 1) + "上已经存在飞船！", "blue");
    		alert("轨道" + (orbitId + 1) + "上已经存在飞船！");
    		return;
    	}
    	this.notebook.orbitStatus[orbitId] = true;
    	//log("轨道" + (orbitId + 1) + "上成功创建飞船！", "blue");
    	alert("轨道" + (orbitId + 1) + "上成功创建飞船！");
    	SpaceManager.creatSpaceShip(orbitId);
    },
     //开始飞行
    start: function(orbitId) {
        //记录中该轨道没有飞船
        if (!this.notebook.orbitStatus[orbitId]) {
        	//log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
        	alert("轨道" + (orbitId + 1) + "上不存在飞船！");
    		return;
        }
    	//log("轨道" + (orbitId + 1) + "发送开始飞行指令！", "blue");
    	alert("轨道" + (orbitId + 1) + "发送开始飞行指令！");
    	SpaceManager.Mediator.sendMessage(
    		{
    			id:orbitId,
    			command:'start'
    		});
    },
    //停止飞行
    stop:function(orbitId) {
    	//记录中该轨道没有飞船
    	if (!this.notebook.orbitStatus[orbitId]) {
        	//log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
        	alert("轨道" + (orbitId + 1) + "上不存在飞船！");
    		return;
        }
    	//log("轨道" + (orbitId + 1) + "发送停止飞行指令！", "blue");
    	alert("轨道" + (orbitId + 1) + "发送停止飞行指令！");
    	SpaceManager.Mediator.sendMessage(
    		{
    			id:orbitId,
    			command:'stop'
    		});
    },
    //飞船自爆
    destroy:function(orbitId) {
    	//记录中该轨道没有飞船
    	if (!this.notebook.orbitStatus[orbitId]) {
        	//log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
        	alert("轨道" + (orbitId + 1) + "上不存在飞船！");
    		return;
        }
    	//log("轨道" + (orbitId + 1) + "发送飞船自爆指令！", "blue");
    	alert("轨道" + (orbitId + 1) + "发送飞船自爆指令！");
    	SpaceManager.Mediator.sendMessage(
    		{
    			id:orbitId,
    			command:'destroy'
    		});
    },
    //设置速度
    setRate:function(orbitId,rate) {
    	    //记录中该轨道没有飞船
    	    if (!this.notebook.orbitStatus[orbitId]) {
    	    	//log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
    	    	alert("轨道" + (orbitId + 1) + "上不存在飞船！");
    			return;
    	    }
    		//log("轨道" + (orbitId + 1) + "发送设置速度指令！", "blue");
    		alert("轨道" + (orbitId + 1) + "发送设置速度指令！");
    		SpaceManager.Mediator.sendMessage(
    			{
    				id:orbitId,
    				command:'start',
    				rate:rate
    			});
    }


}