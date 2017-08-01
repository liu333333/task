/**
 * 操作面板
 */
(function() {
	//添加事件
	function clickButton() {
		var orbit = this.parentNode.dataset.id - 0;
		var message = this.dataset.type;
		switch(message) {
			case 'create':
				if (this.dataset.status == 'create') {
					commander.createSpaceShip(orbit);
					this.dataset.status = 'created';
					this.innerHTML = '自爆毁灭';
					this.nextElementSibling.disable = false;
					this.nextElementSibling.nextElementSibling.disable = false;
					this.nextElementSibling.nextElementSibling.nextElementSibling.disable = false;

				} else {
					commander.destroy(orbit);
					this.dataset.status = 'create';
					this.innerHTML = '创建飞船';
					this.nextElementSibling.disable = true;
					this.nextElementSibling.dataset.status = 'start';
					this.nextElementSibling.innerHTML = '飞行';
					this.nextElementSibling.nextElementSibling.disable = true;
					this.nextElementSibling.nextElementSibling.value = 1;
					this.nextElementSibling.nextElementSibling.nextElementSibling.disable = true;
				}
				break;
			case 'drive':
				if (this.dataset.status == 'start') {
					commander.start(orbit);
					this.dataset.status = 'stop';
					this.innerHTML = '停止';
				} else {
					commander.stop(orbit);
					this.dataset.status = 'start';
					this.innerHTML = '开始';
				}
				break;
			case 'rate':
				var value = this.previousElementSibling.value - 0;
				commander.setRate(orbit,value);
				break;

		}
	}


    //给按钮添加事件
    var oBtn = document.getElementsByTagName('button');
    for (var i = 0; i < oBtn.length; i++) {
    	oBtn[i].addEventListener('click',clickButton);
    }
})();