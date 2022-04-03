let speed = 10;
let pspeed = 12;
let pheight = 75;

let ball;
let dbill;

let p1y = 0;
let p2y = 0;

let p1looses = 0;
let p2looses = 0;

function setup() {
  createCanvas(400, 500);
  textSize(24);

  ball = createVector(270, 250);
  dbill = createVector(1, 1);
}

function draw() {
  background(220);
  
  
  text('p1 '+p1looses, width/2-20, 30);
  text('p2 '+p2looses, width/2-20, 50);

  if (keyIsDown(UP_ARROW)) p1y -= pspeed;
  if (keyIsDown(DOWN_ARROW)) p1y += pspeed;
  if (keyIsDown(87)) p2y -= pspeed;
  if (keyIsDown(83)) p2y += pspeed;
  
  dbill = p5.Vector.normalize(dbill);
  ball.add(dbill.mult(speed));
  
  
  ellipse(ball.x, ball.y, 10, 10);

  rect(0, p1y, 10, pheight);
  rect(390, p2y, 10, pheight);
  fill(255);

  
  if (ball.y > height || ball.y < 0) dbill.mult([1, -1]);

  
  if (ball.x < 0) {
    if (checkPlatfrom(p1y)) {
      fill(255, 0, 0);
      p1looses += 1;
    }
  }

  if (ball.x > width) {
    if (checkPlatfrom(p2y)) {
      fill(0, 255, 0);
      p2looses += 1;
    }
  }

  
}

function checkPlatfrom(py) {
  let govno = (ball.y - py) / pheight;
  print(govno)
  if (govno < 0 || govno > 1) {
    flipx();
    return true;  // loose
  }
  flipx((govno - 0.5) * 2);
}

function flipx(y) {
  dbill.x = ball.x < 0 ? 1 : -1;
  dbill.y = y ? y : random(-1, 1);
}
