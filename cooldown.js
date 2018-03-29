function Bar(x, y, fillPercent, w, h) {
	this.x = x;
	this.y = y;
	this.bar = fillPercent;
	
	this.w = w;
	this.h = h;
	
	this.show = function() {
		fill(0);
		stroke(255);
		rect(this.x, this.y, this.w, this.h);
		fill(255);
		rect(this.x, this.y, this.w * this.bar, this.h);
		textSize(24);
  		fill(255);
  		
  		text("Cooldown: ", width - this.w - 130, 26);
	}
	
	this.update = function() {
		if (this.bar < 1) {
			this.bar += 0.001;
		}
	}
}