// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//var Bird = require('Bird');



cc.Class({
    extends: cc.Component,

    properties: {
        bird0_1: {
            default: null,
            type: cc.Node
        },
        bird1_1: {
            default: null,
            type: cc.Node
        },
        bird2_1: {
            default: null,
            type: cc.Node
        },
        bird5_1: {
            default: null,
            type: cc.Node
        },
        dragon_1: {
            default: null,
            type: cc.Node
        },
        monster_1: {
            default: null,
            type: cc.Node
        },

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function (){
        this.bird0_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',1);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
             }
             else if(this.mapNum == 2){
                 cc.director.loadScene('game2');
            }
            
        });
        this.bird1_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',2);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
            }
            else if(this.mapNum == 2){
                cc.director.loadScene('game2');
            }
        
        });
        this.bird2_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',3);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
            }
            else if(this.mapNum == 2){
                cc.director.loadScene('game2');
            }
        
        });
        this.bird5_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',4);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
            }
            else if(this.mapNum == 2){
                cc.director.loadScene('game2');
            }
        
        });
        this.dragon_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',5);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
            }
            else if(this.mapNum == 2){
                cc.director.loadScene('game2');
            }
        
        });
        this.monster_1.on('touchstart', function() {
            this.num=cc.sys.localStorage.setItem('portrartNum',6);
            this.mapNum = cc.sys.localStorage.getItem("mapNum");
            if(this.mapNum == 1){
                cc.director.loadScene('game1');
            }
            else if(this.mapNum == 2){
                cc.director.loadScene('game2');
            }
        
        });  
    },



    start () {

    },

    // update (dt) {},
});
