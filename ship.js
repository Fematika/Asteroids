function Ship() {
	this.pos = createVector(width / 2, height / 2);
	this.r = 20;
	this.heading = 0;
	this.rotation = 0;
	this.vel = createVector(0, 0);
	this.isBoosting = false;
	this.invincible = false;
	
	this.boosting = function(b) {
		this.isBoosting = b;
	}
	
	this.update = function() {
		this.pos.add(this.vel);
		this.vel.mult(.99);
		
		if (this.isBoosting) {
  			ship.boost();
 		 }
	}
	
	this.boost = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.5);
		this.vel.add(force);
	}
	
	this.setRotation = function(angle) {
		this.rotation = angle;
	}
	
	this.edges = function() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
		
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}
	
	this.turn = function() {
		this.heading += this.rotation;
	}
	
	this.render = function() {
		push();
		
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r - 2);
		
		pop();
	}
	
	this.hits = function(asteroid) {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < this.r + asteroid.r) {
			return true;
		} else {
			return false;
		}
	}
	
	this.hyperSpace = function() {
		this.pos.x += 300 * cos(this.heading);
		this.pos.y += 300 * sin(this.heading);
	}
}