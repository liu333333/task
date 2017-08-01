//指挥官
var Commander = {
	//记录每个飞船的状态
	noteBook :{
		//各个轨道的状态
        orbitStatus: [false, false, false, false]
	},
	//创建宇宙飞船
	//orbitId表示在哪个轨道创建
	createSpaceShip : function (orbitId) {
		if (this.noteBook.orbitStatus[orbitId]) {
			log('轨道'+(orbitId+1)+'上已经存在飞船','blue');
			return;
		}
		log('正在发送轨道'+(orbitId+1)+'上创建飞船的命令','yellow');
		this.noteBook.orbitStatus[orbitId] = true;
		SpaceShipManager.Mediator.createSpaceShip(orbitId);
	},
	destroy : function(orbitId) {
		if (!this.noteBook.orbitStatus[orbitId]) {
			log('轨道'+(orbitId+1)+'上不存在飞船','blue');
			return;
		}
		this.noteBook.orbitStatus[orbitId] = false;
		log('正在发送轨道'+(orbitId+1)+'上销毁飞船的命令','yellow');
		SpaceShipManager.Mediator.sendMessage(
			{
				id:orbitId,
				command : 'destroy'
			});
	},
	start : function(orbitId) {
		if (!this.noteBook.orbitStatus[orbitId]) {
			log('轨道'+(orbitId+1)+'上不存在飞船','blue');
			return;
		}
		log('正在发送轨道'+(orbitId+1)+'上飞船开始飞行的命令','yellow');
		SpaceShipManager.Mediator.sendMessage({
			id:orbitId,
			command : 'start'
		});
	},
	stop : function (orbitId) {
		if (!this.noteBook.orbitStatus[orbitId]) {
			log('轨道'+(orbitId+1)+'上不存在飞船','blue');
			return;
		}
		log('正在发送轨道'+(orbitId+1)+'上飞船停止飞行的命令','yellow');
		SpaceShipManager.Mediator.sendMessage({
			id:orbitId,
			command:'stop'
		});
	},
	setRate : function(orbitId,rate) {
		if (!this.noteBook.orbitStatus[orbitId]) {
			log('轨道'+(orbitId+1)+'上不存在飞船','blue');
			return;
		}
		log('正在发送轨道'+(orbitId+1)+'上飞船改变速度的命令','yellow');
		SpaceShipManager.Mediator.sendMessage({
			id:orbitId,
			command:'rate',
			rate : rate
		});
	}
};