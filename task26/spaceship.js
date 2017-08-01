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

/**
 * 飞船类
 * @param {number} orbit 所在轨道
 */

 function SpaceShip(orbit) {
 	var obj = {
 		//所在轨道
 		_orbit: orbit,
 		//动力系统
 		drive: {
 			//飞行
 			start:function() {
 				if (obj._enengy > 0) {
 					obj._status = START;
 				}
 			},
 			//停止
 			stop:function() {
 				obj._status = STOP;
 			},
 			//由宇宙管理员操作的飞行功能
 			_fly:function() {
 				if (obj._status == START) {
 					obj._angle += obj._rate;
 				}
 				obj._angle = obj._angle % 360;
 			}
 		},
 		//能源系统
        energy: {
            /**
             * 添加能源
             * @param num 添加量
             */
             add:function(num) {
             	obj._enengy += num;
             	if (obj._enengy > 100) {
             		obj._enengy = 100;
             	}
             },
             /**
              * 消耗能源
              * @param num 消耗量
              */
             consume:function(num) {
             	if (obj._status == START) {
             		obj._enengy -= num;
             	}
             	if (obj._enengy < 0) {
             		obj._status = STOP;
             		obj._enengy =0;
             	}
             },
             /**
              * 获取当前能源值
              */
             get:function() {
             	return obj._enengy;
             }
         },
         //信号系统
         telegraph: {
             /**
              * 向飞船发送信号
              * @param message 信号内容
              */
              sendMessage:function(message) {
              	//检查消息是否是发给自己的
              	if (message.id != obj._orbit) {
              		return;
              	}
              	//执行命令
              	switch(message.command) {
              		//开始飞行
              		case 'start' :
              			obj.drive.start();
              			break;
              		//停止飞行
              		case 'stop' :
              			obj.drive.stop();
              			break;
              		//自爆
              		case 'destroy' :
              			obj.destroy.destroy();
              			break;
              		case 'rate' :
              			obj._rate = message.value;
              			break;
              	}
              }
          },
          destroy: {
          	destroy:function() {
          		obj._destroyed = true;
          	}
          },
          //当前状态
          _status : STOP,
          //当前能源
          _enengy : 100,
          //是否销毁
          _destroyed : false,
          //速度
          _rate : 1,
          //所在位置（旋转角度）
          _angle : 0
 	} ;
 	return obj;
 }