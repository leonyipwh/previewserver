
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//text
var style={
	font:"50px Arial",
	fill:"white",
	align:"center"
};

var timer;

var start = {

	preload: function(){
		this.load.image('startBg','assets/img/startBg.png');
		this.load.image('startBtn','assets/img/button.png');
	},

	create: function(){
		this.startBg = this.game.add.sprite(0,0,'startBg');
		this.startBtn = this.game.add.button(game.world.centerX,game.world.centerY,'startBtn',startGame);
		this.startBtn.scale.setTo(0.3);
		this.startBtn.anchor.setTo(0.5);

		startTxt =game.add.text(game.world.centerX,game.world.centerY-200,"Start",style);
		startTxt.anchor.setTo(0.5);
	},

	update: function(){

	}
};

var gamePlay = {

	preload: function(){
		this.load.image('btn','assets/img/button.png');
		this.load.image('btnP','assets/img/buttonP.png');
	},

	create: function(){
		btn = this.game.add.button(100,100,'btn',btnClick);
		btn.scale.setTo(0.3);
		btn.onInputOver.add(over, this);
		btn.onInputOut.add(out, this);

		btn2 = this.game.add.button(500,100,'btn',btnClick);
		btn2.scale.setTo(0.3);

		btn3 = this.game.add.button(300,300,'btn',btnClick);
		btn3.scale.setTo(0.3);

		scoreTxt = game.add.text(10,10,"0",style);

		score = 0;

		timer = 30;

	},

	update: function(){

		updateTimer();

	}
};

var result = {

	preload: function(){
		this.load.image('reBtn','assets/img/button.png');

	},

	create: function(){

		this.byeTxt = game.add.text(game.world.centerX-100,game.world.centerY-200,"Result: ",style);

		this.resultTxt = game.add.text(game.world.centerX+80,game.world.centerY-200,score,style);

		this.reBtn = this.game.add.button(game.world.centerX,game.world.centerY,'reBtn',reGame);
		this.reBtn.scale.setTo(0.3);
		this.reBtn.anchor.setTo(0.5);

	},

	update: function(){

	}
};

game.state.add('start',start);
game.state.start('start');

game.state.add('gamePlay',gamePlay);
game.state.add('result',result);
// game.state.start('gamePlay');


function btnClick(){
	score++;

	scoreTxt.text = score;

	if (score==10) {
		game.state.start('result');

	}
}

function startGame(){
	game.state.start('gamePlay');
}

function reGame(){
	game.state.start('start');
}

function over(){
	btn.loadTexture('btnP');
}

function out(){
	btn.loadTexture('btn');
}
