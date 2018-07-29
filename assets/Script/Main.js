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
        pressAudio:
        {
            default:null,
            url: cc.AudioClip
        },
        startAudio: {
            default:null,
            url: cc.AudioClip
        },
        Map1Btn: {
            default: null,
            type: cc.Node
        },
        Map2Btn: {
            default: null,
            type: cc.Node
        },
        //打开排行榜按钮
        RankBtn: {
            default: null,
            type: cc.Node
        },
        //排行榜
        rank: {
            default: null,
            type: cc.Node
        },
        //排行榜数据
        rank_num: {
            default: [],
            type: [cc.Label]
        },
        //排行榜关闭按钮
        rank_close: {
            default: null,
            type: cc.Node
        },
        //打开指导
        IntroBtn: {
            default: null,
            type: cc.Node
        },
        intro: {
            default: null,
            type: cc.Node
        },
        //关闭指导
        intro_close: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function() {
        //this.startAudio.play();
        let self = this;
        //预加载game游戏场景
        cc.director.preloadScene('game1');
        cc.director.preloadScene('game2');
        let id = cc.audioEngine.play(self.startAudio, true, 1 );
        //绑定开始事件，跳转到游戏界面
        this.Map1Btn.on('touchstart', function() {
            cc.audioEngine.pause(id);
            cc.audioEngine.play(self.pressAudio, false, 1);
            cc.director.loadScene('game1');
            cc.sys.localStorage.setItem('mapNum', 1);
        });
        this.Map2Btn.on('touchstart', function() {
            cc.audioEngine.pause(id);
            cc.audioEngine.play(self.pressAudio, false, 1);
            cc.director.loadScene('game2');
            cc.sys.localStorage.setItem('mapNum', 2);
        });
        //打开排行榜
        let r=this;
        this.rank_anim=r.rank.getComponent(cc.Animation);
        this.RankBtn.on('touchstart', function(){
            //显示排行榜
            cc.audioEngine.play(self.pressAudio, false, 1);
            r.rank_anim.play('rank_open');

            r.RankBtn.pauseSystemEvents(true);
            r.Map1Btn.pauseSystemEvents(true);
            r.Map2Btn.pauseSystemEvents(true);
            r.IntroBtn.pauseSystemEvents(true);
            //显示排行榜数据
            let arr=cc.sys.localStorage.getItem('arr');
            arr?arr=arr.split(','):arr=[];
            for(let i = 0; i < 5; i++){
                arr[i] = arr[i] || 0;
                r.rank_num[i].string = arr[i];
            }
        });
        //关闭排行榜
        this.rank_close.on('touchstart', function(){
            r.rank_anim.play('rank_close');
            r.RankBtn.resumeSystemEvents(true);
            r.Map1Btn.resumeSystemEvents(true);
            r.Map2Btn.resumeSystemEvents(true);
            r.IntroBtn.resumeSystemEvents(true);
        });

        //打开指导界面
        let i = this;
        this.intro_anim=i.intro.getComponent(cc.Animation);
        this.IntroBtn.on('touchstart', function(){
            //显示指导界面
            cc.audioEngine.play(self.pressAudio, false, 1);
            i.intro_anim.play('intro_open');
            i.IntroBtn.pauseSystemEvents(true);
            i.RankBtn.pauseSystemEvents(true);
            i.Map1Btn.pauseSystemEvents(true);
            i.Map2Btn.pauseSystemEvents(true);

        });
        //关闭
        this.intro_close.on('touchstart', function(){
            i.intro_anim.play('intro_close');
            i.IntroBtn.resumeSystemEvents(true);
            i.RankBtn.resumeSystemEvents(true);
            i.Map1Btn.resumeSystemEvents(true);
            i.Map2Btn.resumeSystemEvents(true);
        });
        //this.startAudio.pause();
    },
});