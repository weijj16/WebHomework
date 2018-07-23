(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Bird.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e47c6UbGPJF77OxmgwgJMbA', 'Bird', __filename);
// Script/Bird.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        //点击飞行的声音
        flyAudio: {
            url: cc.AudioClip,
            default: null
        },

        gravity: 5, //重力大小
        flySpeed: 2, //重力和飞行的中间影响值
        power: 5 //飞行的力量
    },

    //下坠
    flyDown: function flyDown() {
        var down = cc.moveBy(this.flySpeed, cc.p(0, -this.gravity)).easing(cc.easeCubicActionOut());
        this.node.runAction(down);
    },

    //上升
    flyUp: function flyUp() {
        var up = cc.moveBy(this.flySpeed, cc.p(0, 50 * this.power)).easing(cc.easeCubicActionOut());
        this.node.runAction(up);
    },

    //点击向上飞起
    setInputControl: function setInputControl() {
        var self = this;

        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touches, event) {
                cc.audioEngine.play(self.flyAudio, false, 1);
                self.flyUp();
                return true;
            },
            onTouchMoved: function onTouchMoved() {},
            onTouchEnded: function onTouchEnded() {}

            //获取监听对象
        };this.touchListener = cc.eventManager.addListener(listener, self.node);
    },

    // use this for initialization
    onLoad: function onLoad() {
        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();

        // 开启碰撞检测系统
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;


        this.touchListener;

        this.collision = false;

        this.setInputControl();
    },

    //检测是否发生碰撞
    onCollisionEnter: function onCollisionEnter() {
        this.collision = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.flyDown();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Bird.js.map
        