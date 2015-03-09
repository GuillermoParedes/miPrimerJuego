
ViruzWar.Game = function(game){

	var player;
	var aliens;
	var bullets;
	var bulletTime = 0;
	var cursors;
	var fireButton;
	var explosions;
	var starfield;
	var score = 0;
	var scoreString = '';
	var scoreText;
	var lives;
	var enemyBullet;
	var firingTimer = 0;
	var stateText;
	var livingEnemies = [];
};

ViruzWar.Game.prototype = {
	create : function(){
		this.add.sprite(0, 0, 'background');
		
		this.add.sprite(10, 5, 'score-bg');
		this.add.button(ViruzWar.GAME_WIDTH-96-10, 5, 'button-pause', this.pauseGame, this);
		//  Our bullet group
	    bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);
	   // The enemy's bullets
	    enemyBullets = this.add.group();
	    enemyBullets.enableBody = true;
	    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets.createMultiple(30, 'enemyBullet');
	    enemyBullets.setAll('anchor.x', 0.5);
	    enemyBullets.setAll('anchor.y', 1);
	    enemyBullets.setAll('outOfBoundsKill', true);
	    enemyBullets.setAll('checkWorldBounds', true);

		//creacion de la nave espacial
		player = this.add.sprite(50, 760, 'ship');	
		player.anchor.setTo(0.5, 0.5);
		this.physics.enable(player, Phaser.Physics.ARCADE);
	   
		//creacion de los aliens
		aliens = this.add.group();
    	aliens.enableBody = true;
    	aliens.physicsBodyType = Phaser.Physics.ARCADE;
		this.createAliens();	

		//Creacion del Score del juego
		scoreString = 'Score : ';
		score = 10;
		scoreText = this.add.text(100, 30, scoreString + score, {font : '25px Arial', fill : '#fff'});

    	 //  An explosion pool
	    explosions = this.add.group();
	    explosions.createMultiple(30, 'kaboom');
	    explosions.forEach(this.setupInvader, this);
	 	
	 	//  Text
	    stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
	    stateText.anchor.setTo(0.5, 0.5);
	    stateText.visible = false
	   	
	   	//  Lives
	    lives = this.game.add.group();
	    this.game.add.text(this.game.world.width - 300, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
	    for (var i = 0; i < 3; i++) {
	        var ship = lives.create(this.game.world.width - 180 + (30 * i), 35, 'ship');
	        ship.anchor.setTo(0.5, 0.5);
	        ship.angle = 90;
	        ship.alpha = 0.4;
    	}
	    cursors = this.input.keyboard.createCursorKeys();
    	fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	setupInvader : function(invader){
		invader.anchor.x = 0.5;
    	invader.anchor.y = 0.5;
    	invader.animations.add('kaboom');
	},
	pauseGame : function(){
		// var ima = this.add.sprite(0,100, 'soldado-cover');
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(150, 450, "Juego Pausado, \n click en la pantalla \n para continuar.", {font : '40px Arial', fill : 'red'});
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
			// ima.destroy();
		}, this);
	},
	update : function(){
		//  Reset the player, then check for movement keys
	    player.body.velocity.setTo(0, 0);

	    if (cursors.left.isDown)
	    {
	        player.body.velocity.x = -200;
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 200;
	    }
	    if (cursors.up.isDown) {
	    	player.body.velocity.y = -200;
	    } else if(cursors.down.isDown){
	    	player.body.velocity.y = 200
	    }

	    //  Firing?
	    if (fireButton.isDown)
	    {
	        this.fireBullet();
	    }

	    if (this.time.now > this.firingTimer)
	    {
	        this.enemyFires();
	    } 
	   if (this.game.input.activePointer.isDown)
	    {
	        //  Boom!
	        this.fireBullet();
	    }
	    //  Run collision
	    this.game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
	    this.game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
	},
	createAliens : function(){
		for (var y = 0; y < 4; y++){
	        for (var x = 0; x < 10; x++){
	            var alien = aliens.create(x * 48, y * 50, 'invader');
	            alien.anchor.setTo(0.5, 0.5);
	            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
	            alien.play('fly');
	            alien.body.moves = false;
	        }
	    }
	    aliens.x = 50;
	    aliens.y = 100;
	    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
	    var tween = this.add.tween(aliens).to( { x: 150 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	    //  When the tween loops it calls descend
	    tween.onLoop.add(this.descend, this);
	},

	descend : function() {
    	aliens.y += 10;
	},

 	fireBullet : function () {
 		
    //  To avoid them being allowed to fire too fast we set a time limit
	    if (this.time.now > this.bulletTime){
	        //  Grab the first bullet we can from the pool
	        bullet = bullets.getFirstExists(false);
	        
	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(player.x, player.y + 8);
	            bullet.body.velocity.y = -400;
	            this.bulletTime = this.time.now + 200;
	        }
	    } 
	    else {
	    	
	    	bullet = bullets.getFirstExists(false);
	        
		        if (bullet){
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            this.bulletTime = this.time.now + 200;
		        }
	    }
	},

	resetBullet : function(bullet) {
	    //  Called if the bullet goes out of the screen
	    bullet.kill();
	},
	enemyFires : function(){
		 
		//  Grab the first bullet we can from the pool
	    enemyBullet = enemyBullets.getFirstExists(false);

	    livingEnemies.length=0;

	    aliens.forEachAlive(function(alien){

	        // put every living enemy in an array
	        livingEnemies.push(alien);
	    });


	    if (enemyBullet && livingEnemies.length > 0)
	    {
	        
	        var random=this.rnd.integerInRange(0,livingEnemies.length-1);

	        // randomly select one of them
	        var shooter=livingEnemies[random];
	        // And fire the bullet from this enemy
	        enemyBullet.reset(shooter.body.x, shooter.body.y);

	        this.physics.arcade.moveToObject(enemyBullet,player,120);
	        firingTimer = this.time.now + 2000;
	    } 
	},
	enemyHitsPlayer : function(player,bullet) {
    
	    bullet.kill();

	    live = lives.getFirstAlive();

	    if (live){
	        live.kill();
	    }

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(player.body.x, player.body.y);
	    explosion.play('kaboom', 30, false, true);

	    // When the player dies
	    if (lives.countLiving() < 1)
	    {
	        player.kill();
	        enemyBullets.callAll('kill');

	        stateText.text=" GAME OVER \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        this.input.onTap.addOnce(restart,this);
	    }

	},
	collisionHandler : function(bullet, alien) {

	    //  When a bullet hits an alien we kill them both
	    bullet.kill();
	    alien.kill();

	    //  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(alien.body.x, alien.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (aliens.countLiving() == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        enemyBullets.callAll('kill',this);
	        stateText.text = ' Ganaste, \n Click para reiniciar';
	        stateText.visible = true;

	        //the "click to restart" handler
	        this.input.onTap.addOnce(this.restart,this);
	    }

	},
	log : function(message){
		console.log(message);
	},
	restart : function(){
		  //  A new level starts
    
	    //resets the life count
	    lives.callAll('revive');
	    //  And brings the aliens back from the dead :)
	    aliens.removeAll();
	    this.createAliens();

	    //revives the player
	    player.revive();
	    //hides the text
	    stateText.visible = false;
	}
}