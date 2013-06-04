var Keys = function(){
	this.logKeys = true;
	this.anyKey = false;
	
	this.pressedKeys = {
		UP: false,
		DOWN: false,
		LEFT: false,
		RIGHT: false,
		W: 	   false,
		S: 	   false,
		A: 	   false,
		D: 	   false,
		CTRL: false
	};
	this.keys = {
		UP: 32,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		W:     87,
		S:     83,
		A: 	   65,
		D: 	   68,
		CTRL:  17
	};
}

Keys.prototype.log = function(key, action) {
	console.log(key + "," + up);
}

Keys.prototype.onKeyDown = function(e) {
	k = e.keyCode;

	this.anyKey = true;
	for(var i in this.keys) {
		if(k === this.keys[i]) {
			e.preventDefault();
			this.pressedKeys[i] = true;
		}
	}
}

Keys.prototype.onKeyUp = function(e) {
	k = e.keyCode;
	this.anyKey = false;
	
	for(var i in this.keys) {
		if(k === this.keys[i]) {
			e.preventDefault();
			this.pressedKeys[i] = false;
		}
	}
}
