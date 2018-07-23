// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Bird = require('Bird');
cc.Class({
    extends: cc.Component,

    properties: {

        //管道对象
        pipeUp: {
            default: null,
            type: cc.Prefab
        },

        pipeDown: {
            default: null,
            type: cc.Prefab
        },

        //小鸟对象
        bird: {
            default: null,
            type: Bird
        },

        //地板对象
        ground: {
            default: null,
            type: cc.Node
        },

        //管道数组
        pipePrefabs: {
            default: [],
            type: [cc.Prefab]
        },

        //菜单的按钮
        menuBtn: {
            default: null,
            type: cc.Node
        },

        againBtn: {
            default: null,
            type: cc.Node
        },

        Score: {
            default: null,
            type: cc.Node
        },

        ScoreLabel: {
            default: null,
            type: cc.Label
        },

        overBoard: {
            default: null,
            type: cc.Node
        },
        scoreBoard: {
            default: null,
            type: cc.Label
        },

        //最高分数对象
        bestScore: {
            default: null,
            type: cc.Label
        },

        //金币对象
        moneyScore: {
            default: null,
            type: cc.Label
        },
        pipeMaxInterval: 0, //管道的最大间距
        pipeMinInterval: 0, //管道的最小间距
        pipeDistance: 0, //一对管道之间的距离

    },

    //生成管道
    spawnNewPipe: function () {
        //生成两个新的管道对象
        var newPipUp = cc.instantiate(this.pipePrefabs[0]);
        var newPipDown = cc.instantiate(this.pipePrefabs[1]);

        //添加标识
        newPipDown.mark = true;

        //生成一个管道的y轴随机数
        var randY = cc.random0To1() * (this.node.height / 2);

        //将生成的管道放入数组
        this.pipes.push(newPipUp);
        this.pipes.push(newPipDown);

        //管道的对数加一
        this.pipCount++;

        //设置出现的位置
        newPipUp.setPosition(this.setPipePosition(1, randY));
        newPipDown.setPosition(this.setPipePosition(0, randY));

        //添加到游戏中
        this.node.insertChild(newPipUp, 1);
        this.node.insertChild(newPipDown, 1);



    },

    //设置管道位置
    setPipePosition: function (dire, randY) {
        var PosX = 0;
        var PosY = 0;

        //随机生成上下管道的间距
        var pipeInterval = (cc.random0To1() * (this.pipeMaxInterval - this.pipeMinInterval)) + this.pipeMinInterval;

        if (dire) {
            //下边的管道
            PosY = -randY;
        } else {
            //上边的管道
            PosY = this.pipeHeight - randY + pipeInterval;
        }

        PosX = this.pipeDistance + this.sceneWidth;

        return cc.p(PosX, PosY);
    },

    // use this for initialization
    onLoad: function () {

        var self = this;

        self.Score.opacity = 200;
        //管道的高度
        this.pipeHeight = this.pipeUp.data.height;
        //获取管道的宽度
        this.pipeWidth = this.pipeUp.data.width;
        //获取屏幕一半的宽度
        this.sceneWidth = this.node.width / 2;
        //获取屏幕一半的高度
        this.sceneHeight = this.node.height / 2;
        //管道的对数
        this.pipCount = 0;
        //数组初始化
        this.pipes = [];
        //小鸟的高度
        this.birdHeight = this.bird.node.height;
        //分数
        this.score = 0;
        this.ScoreLabel.string = 'score: ' + this.score.toString();
        //金钱
        this.money = 0;
        //判断是否结束
        this.over = false;
        //预加载返回到开始界面的场景
        cc.director.preloadScene('start');

        //获取主角的动画对象
        var birdAnim = this.bird.getComponent(cc.Animation);


        birdAnim.play('bird_blue');


        this.againBtn.on('touchstart', function () {
            //重新开始游戏
            this.mapNum = cc.sys.localStorage.getItem("mapNum")
            if (this.mapNum == 1)
                cc.director.loadScene('game1');
            else if (this.mapNum == 2)
                cc.director.loadScene('game2');
        });

        this.menuBtn.on('touchstart', function () {
            //返回主界面
            cc.director.loadScene('start');
        });


        //定时生成管道
        this.schedule(this.spawnNewPipe, 3);

    },


    gameOver: function () {

        //获取以前的金钱数量
        var money = parseInt(cc.sys.localStorage.getItem('money'));
        //获取最高分
        var bestScore = cc.sys.localStorage.getItem('bestScore');
        this.Score.opacity = 0;
        //计算本次结束的金钱数量
        this.money = Math.floor(this.score / 10);

        money ? money += this.money : money = this.money;
        bestScore = bestScore || 0;
        //停止定时器
        this.unschedule(this.spawnNewPipe, this);
        //初始化数组
        this.pipes = [];
        //取消事件绑定
        cc.eventManager.removeListener(this.bird.touchListener);
        //显示分数
        this.scoreBoard.string = this.score;
        //显示金币数
        this.moneyScore.string = this.money;
        //显示最高分
        this.bestScore.string = bestScore;

        //播放动画事件
        var overAnim = this.overBoard.getComponent(cc.Animation);
        var againAnim = this.againBtn.getComponent(cc.Animation);
        var menuAnim = this.menuBtn.getComponent(cc.Animation);

        overAnim.play('overBoard');
        againAnim.play('button_move3');
        menuAnim.play('button_move2');

        //储存金钱数量
        cc.sys.localStorage.setItem('money', Math.floor(money));

        if (bestScore) {
            //判断当前分数是否大于最高分
            if (bestScore < this.score) {
                //存储最高分数
                cc.sys.localStorage.setItem('bestScore', this.score);
            }
        } else {
            cc.sys.localStorage.setItem('bestScore', this.score);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        for (var index = 0; index < this.pipes.length; index++) {
            this.pipes[index].x -= 1;

            //超出屏幕范围清除元素
            if (this.pipes[index].x < -(this.pipeWidth + this.sceneWidth)) {
                this.node.removeChild(this.pipes[index]);
                this.pipes.shift();
            }

            //判断小鸟是否穿过管道
            if (this.bird.node.x > this.pipes[index].x && this.pipes[index].mark) {
                this.pipes[index].mark = false;
                this.gainScore();
            }

            //判断小鸟是否碰撞到管道上
            if (this.bird.collision) {
                this.over = true;
                this.gameOver();
            }

        }

        //判断小鸟是否超出屏幕以及接触地面
        if ((this.bird.node.y > this.sceneHeight ||
            this.bird.node.y < this.ground.y) &&
            !this.over) {
            this.over = true;
            this.gameOver();
        }


    },
    gainScore: function () {

        this.score += 1;

        this.ScoreLabel.string = 'score: ' + this.score.toString();
    }
});
