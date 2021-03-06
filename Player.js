
function Player(scene) {
	this.scene = scene;
	this.side = 32;
	this.heightSmall = 24;
	this.gravity = 0.4;
	this.speed = -2.5;
	this.collisionDistance = this.side/2;
	this.onFloor = false;
	this.jumping = true;
	this.scaleSpeed = 0.2;
	this.scale = 1;
	this.geometry = new THREE.CubeGeometry(this.side,this.side,this.side,1,1,1);
	//this.material = new THREE.MeshNormalMaterial();
	this.material = new THREE.MeshNormalMaterial();
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	this.mesh.position.y = 100;
	this.mesh.position.x = -100;
	JUMP = 'UP';
	LEFT = 'A';
	RIGHT = 'D';
	SMALL = 'CTRL';
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
	else if(this.speed > -5){
		this.speed -= this.gravity;
	}

	this.collisions();
	this.mesh.scale.setY(this.scale);
	
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
		new THREE.Vector3(-1,0,0)
		
	];
	var positions = [];
	var cambio = [-10, 10, -10, 10];
	var axis = true;
	for( var i = 0; i < 4; i++ ){
		var player_center = this.mesh.position.clone();
		(function( i ){
			if( i > 1 ) axis = false;
			if( axis ){
				player_center.x = player_center.x + cambio[i];
				
			}
			else {
				player_center.y = player_center.y + cambio[i];
			}
			
			positions[i] = player_center;
			
			
		})(i);
	}
	
	
	caster = new THREE.Raycaster();
	
	for(var i = 0; i < directions.length; i++){
		var j, limit;
		if( i > 1 ){
			j = 2;
			limit = 4;
		}
		else {
			j = 0;
			limit = 2;
		}
		
		for( j; j < limit; j++ ){
			caster.set( positions[j], directions[i] );
		
			collisions = caster.intersectObjects(obstacles, true);
			if( collisions.length > 0 && 
				collisions[0].distance <= this.collisionDistance ){
				this.lose();
				/*switch(i){
					case 0:
						this.jumping = false;
						this.onFloor = true;
						this.mesh.position.y = collisions[0].object.position.y + 32.1;
						
						//console.log("down");
						break;
						
					case 1:
						this.mesh.position.y = collisions[0].object.position.y - 32.1;
						//console.log("up");
						this.speed = 0;
						break;
					case 2:
						console.log(positions[j], directions[i], player.mesh.position);
						console.log(collisions[0]);
						this.mesh.position.x = collisions[0].object.position.x - 32.1;
						console.log(positions[j], directions[i], player.mesh.position);
						break;
					case 3:
						//console.log("left", collisions[0].distance);
						this.mesh.position.x = collisions[0].object.position.x + 32.1;
						break;
				}*/
				
			}
		}
	
	}
	
}

Player.prototype.controls = function(){
	if(keys.pressedKeys[JUMP]){
		if(!this.jumping){
			this.jumping = true;
			this.onFloor = false;
			this.speed = 5;
		}
	}
	
	/*if(keys.pressedKeys[LEFT]){
		Tile.speed = Tile.slow;
	}
	
	if(keys.pressedKeys[RIGHT]){
		Tile.speed = Tile.fast;
	}*/
	
	if(keys.pressedKeys[SMALL] && this.scale > 0.75 ){
		this.scale -= this.scaleSpeed;
		this.side = this.heightSmall;
		this.collisionDistance = 12;
		
	}
	else if (this.scale < 1 && !keys.pressedKeys[SMALL] ) {
		this.scale += this.scaleSpeed;
		this.side = 32;
		this.collisionDistance = 16;
	}
}

Player.prototype.lose = function(){
	lose();
}
/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/
