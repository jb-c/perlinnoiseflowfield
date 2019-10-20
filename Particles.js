
function Particle() {
  this.Position = createVector(random(width),random(height));
  this.Velocity = createVector(0,0);
  this.Acceleration = createVector(0,0);
  this.PreviousPosition = this.Position.copy();
  this.colour = 0;

  this.update = function() {
  this.Position.add(this.Velocity);
  this.Velocity.add(this.Acceleration);
  this.Velocity.limit(4);
  this.Acceleration.mult(0);
}

  this.ApplyForce = function(Force){
  this.Acceleration.add(Force);
}
  this.show = function() {
  stroke(this.colour,255,255,50);
  this.colour = this.colour + 1;
  if (this.colour > 255) {
    this.colour = 0;
  }
  strokeWeight(1);
  line(this.Position.x,this.Position.y,this.PreviousPosition.x,this.PreviousPosition.y);
  this.UpdatePrevious();
}
this.Wrap = function(){
  if(this.Position.x > width){
    this.Position.x = 0;
    this.UpdatePrevious();
  }
  if(this.Position.x < 0){
    this.Position.x = width;
    this.UpdatePrevious();
  }
  if(this.Position.y > height){
    this.Position.y = 0;
    this.UpdatePrevious();
  }
  if(this.Position.y < 0){
    this.Position.y = height;
    this.UpdatePrevious();
  }
}
this.UpdatePrevious = function(){
  this.PreviousPosition.x = this.Position.x;
  this.PreviousPosition.y = this.Position.y;
}
}
