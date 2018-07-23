(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b0734wNFOpFOaDrZ6emXXUh', 'Main', __filename);
// Script/Main.js

'use strict';

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
        //开始按钮对象
        Map1Btn: {
            default: null,
            type: cc.Node
        },
        Map2Btn: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        var self = this;

        //预加载game游戏场景
        cc.director.preloadScene('game1');
        cc.director.preloadScene('game2');
        //绑定开始事件，跳转到游戏界面
        this.Map1Btn.on('touchstart', function () {
            //跳转到game游戏场景
            cc.director.loadScene('game1');
            cc.sys.localStorage.setItem('mapNum', 1);
        });
        this.Map2Btn.on('touchstart', function () {
            //跳转到game游戏场景
            cc.director.loadScene('game2');
            cc.sys.localStorage.setItem('mapNum', 2);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
        //# sourceMappingURL=Main.js.map
        