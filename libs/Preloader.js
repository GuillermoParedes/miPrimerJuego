

ViruzWar.Preloader = function(game){
	ViruzWar.GAME_WIDTH = 640;
	ViruzWar.GAME_HEIGHT = 960;
};

ViruzWar.Preloader.prototype = {
	preload : function(){
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite(ViruzWar.GAME_WIDTH-311, ViruzWar.GAME_HEIGHT-27/2,'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		//load images
		this.load.image('background', 'images/background.png');
		
		this.load.image('title','images/title.png');
		this.load.image('soldado-cover', 'images/soldado.png');
		this.load.image('score-bg', 'images/score-bg.png');
		this.load.image('button-pause', 'images/button-pause.png');

			// load spritesheets
		// this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'images/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'images/button-start.png', 401, 143);

		// load sprite invaders
		this.load.spritesheet('invader', 'images/invader32x32x4.png', 32, 32);

		this.load.image('bullet', 'images/bullet.png');
    	this.load.image('enemyBullet', 'images/enemy-bullet.png');
    	this.load.image('ship', 'images/player.png');

    	this.load.spritesheet('monster-idle', 'images/monster-idle.png', 103, 131);

    	this.load.spritesheet('kaboom', 'images/explode.png', 128, 128);
	},
	create : function(){
		this.state.start('StartMenu');
	}
};