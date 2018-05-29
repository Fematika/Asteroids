function Asteroid(pos, r) {
	this.vel = createVector(random(width), random(height));
	this.vel.setMag(random(1, 3));
	this.total = floor(random(5, 15));
	this.offset = [];
	
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(width), random(height));
	}
	
	if (r) {
		this.r = r / 2;
	} else {
		this.r = random(15,30);
	}
	
	for (let i = 0; i < this.total; i++) {
		this.offset[i] = random(-this.r / 2.5, this.r / 2.5);
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
	
	this.update = function() {
		this.pos.add(this.vel);
	}

	this.render = function() {
		push();
		
		stroke(255);
		noFill();
		translate(this.pos.x, this.pos.y);
		beginShape();
		
		for (let i = 0; i < this.total; i ++) {
			let angle = map(i, 0, this.total, 0, TWO_PI);
			let r = this.r + this.offset[i];
			let x = r * cos(angle);
			let y = r * sin(angle);
			vertex(x, y);
		}
		
		endShape(CLOSE);
		
		pop();
	}
	
	this.breakup = function() {
		let newA = [];
		newA[0] = new Asteroid(this.pos, this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA;
	}
}