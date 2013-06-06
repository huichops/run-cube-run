
function Tile(scene) {
	this.scene = scene;
	Tile.side = 24;
	Tile.speed = 12;
	Tile.slow = 2.5;
	Tile.fast = 5;
	this.type = 'jump';
	this.geometry = new THREE.CubeGeometry(Tile.side,Tile.side,Tile.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	//this.material = new THREE.MeshBasicMaterial({color:0x00EE00});
	
}

Tile.prototype.init = function(){

	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	this.material = new THREE.MeshBasicMaterial({color:0x000000});
	this.wireframe = new THREE.MeshBasicMaterial({color:0xFFFFFF, 
													wireframe: true,
													wireframeLinewidth: 6 });
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	this.mesh2 = new THREE.Mesh(this.geometry,this.wireframe);
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
	scene.add(this.mesh2);
	scene.add(this.mesh);
}

Tile.prototype.update = function(){
	this.mesh.position.x -= Tile.speed;
	if(this.mesh.position.x <= -500){
		var index = tiles.indexOf(this);
		scene.remove(obstacles[index]);
		tiles.splice(index, 1);
		obstacles.splice(index, 1);
	}
	this.mesh2.position = this.mesh.position;
}


/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/

