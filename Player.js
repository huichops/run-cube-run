
function Player(scene) {
	this.scene = scene;
	this.side = 32;
	this.gravity = 0.20;
	this.speed = -2;
	this.collisionDistance = this.side/2;
	this.onFloor = false;
	this.jumping = true;
	this.geometry = new THREE.CubeGeometry(this.side,this.side,this.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	this.material = new THREE.MeshNormalMaterial();
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	this.mesh.position.y = 100;
	JUMP = 'UP';
	LEFT = 'A';
	RIGHT = 'D';
}

Player.prototype.init = function(){
	scene.add(this.mesh);
	this.mesh.x = 200;
	
}
Player.prototype.update = function(){
	this.controls();
	this.mesh.position.y += this.speed;
	if(this.onFloor){
		this.speed = 0;
	}
	else{
		this.speed -= this.gravity;
	}
	this.collisions();
	
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
	
	collisions = caster.intersectObjects(tiles, true);
	if(collisions.length > 0){
			console.log(collisions[0].distance);
	}
}

Player.prototype.controls = function(){
	if(keys.pressedKeys[JUMP]){
		if(!this.jumping){
			this.jumping = true;
			this.onFloor = false;
			this.speed = 4.5;
		}
	}
	
	if(keys.pressedKeys[LEFT]){
		this.mesh.position.x -= 2;
	}
	
	if(keys.pressedKeys[RIGHT]){
		this.mesh.position.x += 2;
	}
}
/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/
