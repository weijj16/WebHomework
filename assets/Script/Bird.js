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
        WingAudio: {
            default: null,
            url: cc.AudioClip
        },
        hitAudio: {
            default: null,
            url: cc.AudioClip
        },
        gravity: 5, //重力大小
        x_speed: 2, //阻力
        y_speed: 5, //飞行的力量
    },

    //点击飞起
    flyTouch: function () {
        let self = this;
        let listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                cc.audioEngine.play(self.WingAudio, false, 1);
                self.flyUp();
                return true;
            },
            onTouchMoved: function () { },
            onTouchEnded: function () { }
        }
        this.touchListener = cc.eventManager.addListener(listener, self.node);
    },
    //上升
    flyUp: function () {
        let up = cc.moveBy(this.x_speed, cc.p(0, 50 * this.y_speed)).easing(cc.easeCubicActionOut());
        this.node.runAction(up);
    },

    //下坠
    flyDown: function () {
        let down = cc.moveBy(this.x_speed, cc.p(0, -this.gravity)).easing(cc.easeCubicActionOut());
        this.node.runAction(down);
    },

    onLoad: function () {
        //获取碰撞检测系统
        let manager = cc.director.getCollisionManager();
        // 开启碰撞检测系统
        manager.enabled = true;
        this.touchListener;
        this.collision = false;
        this.flyTouch();
    },
    //检测是否发生碰撞
    onCollisionEnter: function () {
        let self = this;
        this.collision = true;
        cc.audioEngine.play(self.hitAudio, false, 1);
    },
    update: function (dt) {
        this.flyDown();
    },

});
