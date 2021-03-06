

var ViruzWar = {};

ViruzWar.Boot = function(game){};


ViruzWar.Boot.prototype = {
	preload : function(){
		this.load.image('preloadBar', 'images/loading-bar.png');
	},

	create : function(){
	// set scale options
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		// start the Preloader state
		this.state.start('Preloader');
	}
};
