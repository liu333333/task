/**
 * 操作面板
 */
(function() {
	//绑定按钮事件
	var oBtns = document.getElementsByTagName('button');
	for (var i = 0; i < oBtns.length; i++) {
		oBtns[i].addEventListener('click',buttonClick);
	}

	var buttonClick = function(){
		var orbit = this.parentNode.dataset.id;
		var message = this.dataset.type;
		switch(message) {
			case 'create':
				if (this.dataset.status == 'create') {
					this.dataset.status = 'create';
					this.innerHTML = '自爆销毁';
					//创建完之后，后面的按钮就可以用
					this.nextElementSibling.disable = false;
					this.nextElementSibling.nextElementSibling.disable = false;
					this.nextElementSibling.nextElementSibling.nextElementSibling.disable = false;
					
				}
		}
	};
})();