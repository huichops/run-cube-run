
function Tile(scene) {
	this.scene = scene;
	Tile.side = 32;
	this.speed = 2;
	this.geometry = new THREE.CubeGeometry(Tile.side,Tile.side,Tile.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	this.material = new THREE.MeshBasicMaterial({color:0x00BB00});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
}

Tile.prototype.init = function(x, y, z){

	this.mesh.position.x = x || 0;
	this.mesh.position.y = y || 0;
	this.mesh.position.z = z || 0;

	scene.add(this.mesh);
}

Tile.prototype.update = function(){
	this.mesh.position.x -= this.speed;
}


/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/

