var Incriment = 0.1;
var Scale = 20;
var Cols;
var Rows;
var xoff = 0;
var yoff = 0;
var zoff = 0;
var Field;
var Particles = [];
function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 255);
  background(51);
  Cols = floor(width/Scale);
  Rows = floor(height/Scale);
  Field = new Array(Cols * Rows); //One element for every cell
  for(var i = 0; i < 100; i++){
  Particles[i] = new Particle();
}
}
function draw() {
yoff = 0;
for (var y = 0; y < Rows; y++){
  xoff = 0;
  for (var x = 0; x < Cols; x++){
      var VectorAngle = noise(xoff, yoff, zoff)* TWO_PI; //3d noise value
      if((Math.pow(((x*Scale)-mouseX),2))/600+(Math.pow(((y*Scale)-mouseY),2))/100 < Scale*2){ //This defines an ellipse around the mouse's location. The less than scale *2 is the size of the ellipse
      var EllipseBottom = createVector(mouseX,mouseY+Scale*5);
      var EllipseTop = createVector(mouseX,mouseY-Scale*5);
      var CurrentCellVector = createVector(x*Scale,y*Scale);
          if ((x*Scale)> mouseX){
                    if ((y*Scale) > mouseY){
                      VectorAngle = atan((CurrentCellVector.y - EllipseBottom.y)/(CurrentCellVector.x - EllipseBottom.x));
                      var Vector = p5.Vector.fromAngle(VectorAngle);//Bottom Right
                    }else{
                      VectorAngle = atan((CurrentCellVector.y - EllipseTop.y)/(CurrentCellVector.x - EllipseTop.x));
                      var Vector = p5.Vector.fromAngle(VectorAngle);//Top Right
                    }
          }else{
                    if ((y*Scale) > mouseY){
                      VectorAngle = atan((CurrentCellVector.y - EllipseBottom.y)/(CurrentCellVector.x - EllipseBottom.x));
                        var Vector = p5.Vector.fromAngle(VectorAngle);//Bottom Left
                    }else{
                        VectorAngle = atan((CurrentCellVector.y - EllipseTop.y)/(CurrentCellVector.x - EllipseTop.x));
                        var Vector = p5.Vector.fromAngle(VectorAngle);//Top Left
                    }
          }
      }else{
        var Vector = p5.Vector.fromAngle(VectorAngle);
      }
      Vector.setMag(1); //Sets the lenght of the vector line to 1
      Field[((x + y) * Cols)] = Vector;
      xoff += Incriment;
      stroke(0, 50);
      //push(); //Saves location
      //translate(x * Scale, y * Scale); //Moves to the corner of current cell
      //rotate(Vector.heading()); //Rotates by the vector's angle
      //strokeWeight(1);
      //line(0, 0, Scale, 0); //Line from corner of box to the scale centre
      //pop();
  }
  yoff += Incriment;
zoff += 0.003;
}
for (var i = 0; i < Particles.length; i++){
var Force = Field[(floor(Particles[i].Position.x/Scale) + floor(Particles[i].Position.y / Scale)) * Cols];
Particles[i].ApplyForce(Force);
Particles[i].update();
Particles[i].Wrap();
Particles[i].show();
}
//console.log(mouseX,mouseY);
console.log(floor(frameRate()));
}
