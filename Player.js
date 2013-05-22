
function Player(scene) {
	this.scene = scene;
	this.side = 32;
	this.gravity = 0.20;
	this.moveSpeed = 3;
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
	this.onFloor = false;
	if(collisions.length > 0){
		var rayDistance = collisions[0].distance;
		if(rayDistance < this.collisionDistance){
			this.jumping = false;
			this.onFloor = true;
			this.mesh.position.y = piso.position.y + this.collisionDistance + 5;
		}
	}
	
	var directions = [
		new THREE.Vector3(0,-1,0),
		new THREE.Vector3(0,1,0),
		new THREE.Vector3(1,0,0),
		new THREE.Vector3(-1,0,0),
		
	];
	caster = new THREE.Raycaster();
	
	for(var i = 0; i < directions.length; i++){
		caster.set( this.mesh.position, directions[i] );
		
		collisions = caster.intersectObjects(tiles);
		if( collisions.length > 0 && 
			collisions[0].distance <= this.collisionDistance ){			
			switch(i){
				case 0:
					this.jumping = false;
					this.onFloor = true;
					this.mesh.position.y = collisions[0].object.position.y + 32;
					console.log("down");
					break;
					
				case 1:
					this.mesh.position.y = collisions[0].object.position.y - 32;	
					console.log("up");
					break;
				case 2:
					console.log("right", collisions[0]);
					console.log(this.collisionDistance);
					this.mesh.position.x = collisions[0].object.position.x - 32;
					break;
				case 3:
					console.log("left", collisions[0].distance);
					this.mesh.position.x = collisions[0].object.position.x + 32;
					break;
			}
			
		}
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
		this.mesh.position.x -= this.moveSpeed;
	}
	
	if(keys.pressedKeys[RIGHT]){
		this.mesh.position.x += this.moveSpeed;
	}
}
/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/
