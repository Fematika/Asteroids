var ship, cooldown;
var total = 10;
var score = 0;
var lives = 3;
var asteroids = []; 
var lasers = [];
var hide = 0;
var start = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	
	for (var i = 0; i < total; i++) {
		asteroids.push(new Asteroid());
	}
	
	cooldown = new Bar(width - 100, 10, 1, 90, 20);
}

var count;
function draw() {
	background(0, 100);
	
  	if (lives > 0) {
  		for (var i = 0; i < asteroids.length; i++) {
  			if (ship.hits(asteroids[i]) && !ship.invincible) {
  				ship.invincible = true;
  				count = 100;
  				
  				ship.pos.x = width / 2;
  				ship.pos.y = height / 2;
  				
  				ship.vel = createVector(0, 0);
  				lives --;
  			}
  			
  			asteroids[i].render();
  			asteroids[i].update();
  			asteroids[i].edges();
  		}
  		if (asteroids.length == 0) {
  			total ++;
  			
  			for (var i = 0; i < total; i++) {
				asteroids.push(new Asteroid());
			}
  		}
  			
  		for (var i = lasers.length - 1; i >= 0; i--) {
  			lasers[i].render();
  			lasers[i].update();
  			
  			if (lasers[i].offscreen()) {
  				lasers.splice(i, 1);
  			} else {
  				for (var j = asteroids.length - 1; j >= 0; j--) {
  					if (lasers[i].hits(asteroids[j])) {
  						if (asteroids[j].r >= 17) {
  							var newAsteroids = asteroids[j].breakup();
  							asteroids.push(newAsteroids[0]);
  							asteroids.push(newAsteroids[1]);
  						}
  						
  						score += floor(asteroids[j].r * 2);
  						asteroids.splice(j, 1);
  						lasers.splice(i, 1);
  						break;
  					}
  				}
  			}
  		}
  		
  		console.log(lasers.length);
  		
  		if (hide < 1) {
  			ship.render();
  			ship.turn();
  			ship.update();
  			ship.edges();
  		} else {
  			if (frameCount - start + 1 > 50) {
  				hide = 0;
  				ship.hyperSpace();
  			}
  		}
  		
  		textSize(24);
  		fill(255);
  		
  		text("Score: " + score, width / 2, 26);
  		text("Lives: " + lives, 10, 26);
  		
  		cooldown.show();
  		cooldown.update();
  	} else {
  		textSize(100);
  		text("You lose", width / 2 - 200, height / 2);
  	}
  	
  	if (count > 0) {
  		ship.invincible = true;
  	} else {
  		ship.invincible = false;
  	}
  	
  	count --;
}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading));
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-.1);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	} else if (keyCode == DOWN_ARROW) {
		if (cooldown.bar > .9) {
			hide = 1;
			cooldown.bar -= .9;
			start = frameCount;
		}
	}
}

