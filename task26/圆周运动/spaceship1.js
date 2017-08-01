/**
 * 常量：停止状态
 * @type {number}
 */
var STOP = 0;
/**
 * 常量：飞行状态
 * @type {number}
 */
var START = 1;
//创建飞船类
//orbit表示飞船所在的轨道
function SpaceShip(orbit) {
	var obj = {
		_rate : 1,
		_status : STOP,
		_enengy : 100,
		_orbitId : orbit,
		_destroy : false,
		_angle : 0,
		drive : {
			start : function() {
				if (obj._enengy > 0) {
					obj._status = START;
				}
				
			},
			stop : function() {
				obj._status = STOP;
			},
			fly : function() {

				if (obj._status == START) {
					obj._angle += obj._rate;
				}
				obj._angle = obj._angle % 360;
			}
		},
		//能源系统
        energy : {
        	//给宇宙飞船添加能量
        	add : function(num) {
        		obj._enengy += num;
        		if (obj._enengy >= 100) {
        			obj._enengy = 100;
        		}
        	},
        	//飞船消耗能量
        	consume : function(num) {
        		if (obj._status == START) {
        			obj._enengy -= num;
        		}
        		if (obj._enengy <= 0) {
        			obj._status = STOP;
        			obj._enengy = 0;
        		}
        	},
        	//获取能源值
        	get : function() {
        		return obj._enengy;
        	}
        },
        //无线系统
        telegraph : {
        	sendMessage:function(message) {
        		//判断信号是不是发给自己
        		if (message.id != obj._orbitId) {
        			return;
        		}
        		switch(message.command) {
        			case 'start':
        				obj.drive.start();
        				break;
        			case 'stop':
        				obj.drive.stop();
        				break;
        			case 'destroy' :
        				obj.destroy.destroy();
        				break;
        			case 'rate' :
        				obj._rate = message.rate;
        				break;

        		}
        	}
        },
        //毁掉飞船
        destroy: {
        	destroy : function() {
        		obj._destroy = true;
        	}
        }
	};
	return obj;

}