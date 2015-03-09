

ViruzWar.StartMenu = function(game){};

ViruzWar.StartMenu.prototype = {
	create : function(){
		startBg = this.add.image(0, 0, 'background');
		this.add.sprite(-80, ViruzWar.GAME_HEIGHT-514, 'soldado-cover');
		this.add.sprite(200, 60, 'title');
		//add the buytton that will start the game
		this.add.button(ViruzWar.GAME_WIDTH-410-10, ViruzWar.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 2, 1 ,0);
	},
	startGame : function(){
		this.state.start('Game');
	}
};
 