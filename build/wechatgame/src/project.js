require=function c(s,r,a){function p(t,e){if(!r[t]){if(!s[t]){var i="function"==typeof require&&require;if(!e&&i)return i(t,!0);if(h)return h(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=r[t]={exports:{}};s[t][0].call(o.exports,function(e){return p(s[t][1][e]||e)},o,o.exports,c,s,r,a)}return r[t].exports}for(var h="function"==typeof require&&require,e=0;e<a.length;e++)p(a[e]);return p}({Bird:[function(e,t,i){"use strict";cc._RF.push(t,"e47c6UbGPJF77OxmgwgJMbA","Bird"),cc.Class({extends:cc.Component,properties:{flyAudio:{url:cc.AudioClip,default:null},gravity:5,flySpeed:2,power:5},flyDown:function(){var e=cc.moveBy(this.flySpeed,cc.p(0,-this.gravity)).easing(cc.easeCubicActionOut());this.node.runAction(e)},flyUp:function(){var e=cc.moveBy(this.flySpeed,cc.p(0,50*this.power)).easing(cc.easeCubicActionOut());this.node.runAction(e)},setInputControl:function(){var i=this,e={event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,t){return cc.audioEngine.play(i.flyAudio,!1,1),i.flyUp(),!0},onTouchMoved:function(){},onTouchEnded:function(){}};this.touchListener=cc.eventManager.addListener(e,i.node)},onLoad:function(){cc.director.getCollisionManager().enabled=!0,this.touchListener,this.collision=!1,this.setInputControl()},onCollisionEnter:function(){this.collision=!0},update:function(e){this.flyDown()}}),cc._RF.pop()},{}],Game:[function(e,t,i){"use strict";cc._RF.push(t,"ce3b9+qhsRDWoJ/lefoSfPK","Game");var n=e("Bird");cc.Class({extends:cc.Component,properties:{pipeUp:{default:null,type:cc.Prefab},pipeDown:{default:null,type:cc.Prefab},bird:{default:null,type:n},ground:{default:null,type:cc.Node},pipePrefabs:{default:[],type:[cc.Prefab]},menuBtn:{default:null,type:cc.Node},againBtn:{default:null,type:cc.Node},Score:{default:null,type:cc.Node},ScoreLabel:{default:null,type:cc.Label},overBoard:{default:null,type:cc.Node},scoreBoard:{default:null,type:cc.Label},bestScore:{default:null,type:cc.Label},moneyScore:{default:null,type:cc.Label},pipeMaxInterval:0,pipeMinInterval:0,pipeDistance:0},spawnNewPipe:function(){var e=cc.instantiate(this.pipePrefabs[0]),t=cc.instantiate(this.pipePrefabs[1]);t.mark=!0;var i=cc.random0To1()*(this.node.height/2);this.pipes.push(e),this.pipes.push(t),this.pipCount++,e.setPosition(this.setPipePosition(1,i)),t.setPosition(this.setPipePosition(0,i)),this.node.insertChild(e,1),this.node.insertChild(t,1)},setPipePosition:function(e,t){var i,n=0,o=cc.random0To1()*(this.pipeMaxInterval-this.pipeMinInterval)+this.pipeMinInterval;return n=e?-t:this.pipeHeight-t+o,i=this.pipeDistance+this.sceneWidth,cc.p(i,n)},onLoad:function(){this.Score.opacity=200,this.pipeHeight=this.pipeUp.data.height,this.pipeWidth=this.pipeUp.data.width,this.sceneWidth=this.node.width/2,this.sceneHeight=this.node.height/2,this.pipCount=0,this.pipes=[],this.birdHeight=this.bird.node.height,this.score=0,this.ScoreLabel.string="score: "+this.score.toString(),this.money=0,this.over=!1,cc.director.preloadScene("start"),this.bird.getComponent(cc.Animation).play("bird_blue"),this.againBtn.on("touchstart",function(){this.mapNum=cc.sys.localStorage.getItem("mapNum"),1==this.mapNum?cc.director.loadScene("game1"):2==this.mapNum&&cc.director.loadScene("game2")}),this.menuBtn.on("touchstart",function(){cc.director.loadScene("start")}),this.schedule(this.spawnNewPipe,3)},gameOver:function(){var e=parseInt(cc.sys.localStorage.getItem("money")),t=cc.sys.localStorage.getItem("bestScore");this.Score.opacity=0,this.money=Math.floor(this.score/10),e?e+=this.money:e=this.money,t=t||0,this.unschedule(this.spawnNewPipe,this),this.pipes=[],cc.eventManager.removeListener(this.bird.touchListener),this.scoreBoard.string=this.score,this.moneyScore.string=this.money,this.bestScore.string=t;var i=this.overBoard.getComponent(cc.Animation),n=this.againBtn.getComponent(cc.Animation),o=this.menuBtn.getComponent(cc.Animation);i.play("overBoard"),n.play("button_move3"),o.play("button_move2"),cc.sys.localStorage.setItem("money",Math.floor(e)),t?t<this.score&&cc.sys.localStorage.setItem("bestScore",this.score):cc.sys.localStorage.setItem("bestScore",this.score)},update:function(e){for(var t=0;t<this.pipes.length;t++)this.pipes[t].x-=1,this.pipes[t].x<-(this.pipeWidth+this.sceneWidth)&&(this.node.removeChild(this.pipes[t]),this.pipes.shift()),this.bird.node.x>this.pipes[t].x&&this.pipes[t].mark&&(this.pipes[t].mark=!1,this.gainScore()),this.bird.collision&&(this.over=!0,this.gameOver());(this.bird.node.y>this.sceneHeight||this.bird.node.y<this.ground.y)&&!this.over&&(this.over=!0,this.gameOver())},gainScore:function(){this.score+=1,this.ScoreLabel.string="score: "+this.score.toString()}}),cc._RF.pop()},{Bird:"Bird"}],Instruction:[function(e,t,i){"use strict";cc._RF.push(t,"0a018qHGJ1PGrq03o/b9gtS","Instruction"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],Main:[function(e,t,i){"use strict";cc._RF.push(t,"b0734wNFOpFOaDrZ6emXXUh","Main"),cc.Class({extends:cc.Component,properties:{Map1Btn:{default:null,type:cc.Node},Map2Btn:{default:null,type:cc.Node}},onLoad:function(){cc.director.preloadScene("game1"),cc.director.preloadScene("game2"),this.Map1Btn.on("touchstart",function(){cc.director.loadScene("game1"),cc.sys.localStorage.setItem("mapNum",1)}),this.Map2Btn.on("touchstart",function(){cc.director.loadScene("game2"),cc.sys.localStorage.setItem("mapNum",2)})}}),cc._RF.pop()},{}],pencil:[function(e,t,i){"use strict";cc._RF.push(t,"156f6jDz91F/oBgdel4cDXG","pencil"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}]},{},["Bird","Game","Instruction","Main","pencil"]);