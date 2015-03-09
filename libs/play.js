 ViruzWar.Play = function(game){
 	this.world = null;
 };

 ViruzWar.Play.prototype = {

 	create: function(){
 		this.game.physics.startSystem(Phaser.Physics.Arcade);
 		this.world = this.add.sprite(this.world.centerX, this.world.centerY,'world');
 		this.world.anchor.setTo(0.5, 0.5);
 		this.sprite.events.onInputDown.add(this.clickListener, this);
 	},
 	update : function(){
 		this.world = this.add.sprite(this.world.centerX, this.world.centerY,'world');
 		this.world.anchor.setTo(0.5, 0.5);
 	},
 	clickListener : function(){
 		this.game.state.start('gameover');
 	}
 }

 console.log("entro aqui playjs");