function Pattern(scene) {
	this.scene = scene;
	Tile.side = 32;
	this.speed = 2;
	this.geometry = new THREE.CubeGeometry(Tile.side,Tile.side,Tile.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	this.material = new THREE.MeshBasicMaterial({color:0x00BB00});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
}