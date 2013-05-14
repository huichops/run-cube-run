var Keys = function(game){
	this.logKeys = true;
	this.anyKey = false;
	this.game = game;
	
	this.pressedKeys = {
		UP: false,
		DOWN: false,
		LEFT: false,
		RIGHT: false,
		W: 	   false,
		S: 	   false
	};
	this.keys = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		W:     87,
		S:     83
	};
}

Keys.prototype.log = function(key, action) {
	console.log(key + "," + up);
}
Keys.prototype.onKeyDown = function(e) {
	k = e.keyCode;
	
	game.keys.anyKey = true;
	for(var i in game.keys.keys) {
		if(k === game.keys.keys[i]) {
			e.preventDefault();
			game.keys.pressedKeys[i] = true;
		}
	}
}

Keys.prototype.onKeyUp = function(e) {
	k = e.keyCode;
	game.keys.anyKey = false;
	
	for(var i in game.keys.keys) {
		if(k === game.keys.keys[i]) {
			e.preventDefault();
			game.keys.pressedKeys[i] = false;
		}
	}
}
