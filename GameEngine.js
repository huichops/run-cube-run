function GameEngine() {
    this.entities = [];
    this.scene = null;
    this.renderer = null;
	this.camera = null;
    this.lastTime = null;
    this.deltaTime = null;
    
	
    
}

GameEngine.prototype.init = function(renderer) {
    console.log('game initialized');
	this.scene = new THREE.Scene();
	this.renderer = renderer;
}

GameEngine.prototype.start = function() {
  console.log("starting game");
  this.timer = new Timer();
  this.keys = new Keys(this);
  window.addEventListener("keydown", this.keys.onKeyDown, false);
  window.addEventListener("keyup", this.keys.onKeyUp, false);
  var self = this;
  (function gameLoop() {
      self.loop();
      requestAnimFrame(gameLoop);
  })();
}

GameEngine.prototype.loop = function(){
	this.clockTick = this.timer.tick();
	this.update();
	this.draw();
}

GameEngine.prototype.addEntity = function(entity) {
    this.scene.add(entity);
}

GameEngine.prototype.update = function(){	
    var entitiesCount = this.entities.length;
    
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    
    for (var i = this.entities.length-1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.draw = function(callback) {
    
    //this.ctx.save();
    //this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    this.renderer.render(this.scene, this.camera);
    if (callback) {
        callback(this);
    }
   // this.ctx.restore();
}

