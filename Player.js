console.log(THREE.CubeGeometry);
function Player(scene) {
	this.scene = scene;
	this.side = 32;
	this.gravity = 0.15;
	this.speed = -2;
	this.collisionDistance = this.side/2;
	this.onFloor = false;
	this.jumping = true;
	this.geometry = new THREE.CubeGeometry(this.side,this.side,this.side,1,1,1);
	this.material = new THREE.MeshBasicMaterial({color: 0xAAAAAA});
	this.mesh = new THREE.Mesh(geometry,material);
	this.mesh.position.y = 100;
}

Player.prototype.init = function(){
	scene.add(this.mesh);
	this.mesh.x = 200;
	
}
Player.prototype.update = function(){
	if(this.onFloor){
		this.speed = 0;
	}
	else{
		this.speed -= this.gravity;
	}
	this.collisions();
	this.mesh.position.y += this.speed;
}

Player.prototype.collisions = function(){
	var collisions, caster, direction;
	direction = new THREE.Vector3(0,-1,0);
	caster = new THREE.Raycaster(this.mesh.position, direction);
	collisions = caster.intersectObject(piso,true);
	if(collisions.length > 0){
		var rayDistance = collisions[0].distance;
		if(rayDistance < this.collisionDistance){
			this.jumping = false;
			this.onFloor = true;
			this.mesh.position.y = piso.position.y + this.collisionDistance + 5;
		}
	}
	else {
		this.onFloor = false;
		this.jumping = true;
	}
}

/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/
