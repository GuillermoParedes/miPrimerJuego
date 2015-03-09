

//variables globales

window.onload = function(){
	var game = new Phaser.Game(640,960, Phaser.AUTO, 'game');
	//estados del juego
	game.state.add('Boot', ViruzWar.Boot);
	game.state.add('Preloader', ViruzWar.Preloader);
	game.state.add('StartMenu', ViruzWar.StartMenu);
	game.state.add('Game', ViruzWar.Game);
	game.state.start('Boot');
	
}  