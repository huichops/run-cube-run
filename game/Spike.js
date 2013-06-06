function Spike(scene) {
	this.scene = scene;
	this.speed = 2;
	this.geometry = new THREE.CylinderGeometry(0, 16, 32, 50, 50, false);
	this.material = new THREE.MeshNormalMaterial();
	//this.material = new THREE.MeshBasicMaterial({color:0x00BB00});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
}

Spike.prototype.init = function(x, y, z){

	this.mesh.position.x = x || 0;
	this.mesh.position.y = y || 0;
	this.mesh.position.z = z || 0;

	scene.add(this.mesh);
}

Spike.prototype.update = function(){
	this.mesh.position.x -= this.speed;
}
