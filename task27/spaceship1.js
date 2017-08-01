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
function SpaceShip(orbit,rateSet,consumeRate,addRate) {
	var obj = {
		_rate : rateSet,
		_status : STOP,
		_enengy : 100,
		_orbitId : orbit,
		_destroy : false,
		_angle : 0,
                _consume:consumeRate,
                _add:addRate,
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
        	add : function() {
        		obj._enengy += obj._add;
        		if (obj._enengy >= 100) {
        			obj._enengy = 100;
        		}
        	},
        	//飞船消耗能量
        	consume : function() {
        		if (obj._status == START) {
        			obj._enengy -= obj._consume;
        		}
        		if (obj._enengy <= 0) {
        			obj._status = STOP;
        			obj._enengy = 0;
        		}
        	},
        	//获取能源值
        	get : function() {
                        alert('test _enengy'+obj._enengy);
        		return obj._enengy;
        	}
        },
        //无线系统
        telegraph : {
        	sendMessage:function(message) {
                        //先解码
                        var msg =SpaceShipManager.Bus.Adapter.decoder(message) ;
        		//判断信号是不是发给自己
        		if (msg.id != obj._orbitId) {
        			return;
        		}
        		switch(msg.command) {
        			case 'start':
        				obj.drive.start();
        				break;
        			case 'stop':
        				obj.drive.stop();
        				break;
        			case 'destroy' :
        				obj.destroy.destroy();
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