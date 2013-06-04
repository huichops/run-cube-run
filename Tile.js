
function Tile(scene) {
	this.scene = scene;
	Tile.side = 24;
	Tile.speed = 7;
	Tile.slow = 2.5;
	Tile.fast = 5;
	this.type = 'jump';
	this.geometry = new THREE.CubeGeometry(Tile.side,Tile.side,Tile.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	this.material = new THREE.MeshBasicMaterial({color:0x00EE00});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
}

Tile.prototype.init = function(){
	var random = Math.random();
	if ( random < 0.7 ){
		this.type = 'jump';
		var y = 19;
	}
	else{
		this.type = 'crouch';
		var y = 45;
	}
	this.mesh.position.x = 500;
	this.mesh.position.y = y;
	this.mesh.position.z = 0;
	
	scene.add(this.mesh);
}

Tile.prototype.update = function(){
	this.mesh.position.x -= Tile.speed;
	if(this.mesh.position.x <= -1000){
		var index = tiles.indexOf(this);
		scene.remove(obstacles[index]);
		tiles.splice(index, 1);
		obstacles.splice(index, 1);
	}
}


/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/

