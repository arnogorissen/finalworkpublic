'use strict'

//de particles maken

function Particle(x, y) {

  let proximityMult
  let targetSize
  let push

  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.target = new p5.Vector(0, 0);
  this.isKilled = false;

  this.maxSpeed = random(0.25, 2); // How fast it can move per frame.
  this.maxForce = random(8, 15); // Its speed limit.

  this.currentColor = color(0);
  this.endColor = color(0);
  this.colorBlendRate = random(0.01, 0.05);

  this.currentSize = 0;
  this.distToTarget = 0;

  //de beweging van de particle
  this.move = function () {
    this.distToTarget = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

    if (this.distToTarget < closeEnoughTarget) {
      proximityMult = this.distToTarget / closeEnoughTarget;
      this.vel.mult(0.9);
    } else {
      proximityMult = 1;
      this.vel.mult(0.95);
    }
    
    if (this.distToTarget > 1) {
      let steer = new p5.Vector(this.target.x, this.target.y);
      steer.sub(this.pos);
      steer.normalize();
      steer.mult(this.maxSpeed * proximityMult * speedSlider.slider.value());
      this.acc.add(steer);
    }

    let mouseDist = dist(this.pos.x, this.pos.y, mouseX, mouseY);

    // De beweging van de particles van en naar de cursor
    if (mouseDist < 20) {
      if (mouseIsPressed) {
        push = new p5.Vector(mouseX, mouseY);
        push.sub(new p5.Vector(this.pos.x, this.pos.y));
      } else {
        push = new p5.Vector(this.pos.x, this.pos.y);
        push.sub(new p5.Vector(mouseX, mouseY));
      }
      push.normalize();     
      this.acc.add(push);
    }

    this.vel.add(this.acc);
    this.vel.limit(this.maxForce * speedSlider.slider.value());
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.draw = function () {
    this.currentColor = lerpColor(this.currentColor, this.endColor, this.colorBlendRate);
    stroke(this.currentColor);

    if (!this.isKilled) {
      targetSize = map(min(this.distToTarget, closeEnoughTarget),
        closeEnoughTarget, 0,
        0, particleSizeSlider.slider.value());
    } else {
      targetSize = 2;
    }

    this.currentSize = lerp(this.currentSize, targetSize, 0.1);
    strokeWeight(this.currentSize);

    point(this.pos.x, this.pos.y);
  }

  this.kill = function () {
    if (!this.isKilled) {
      this.target = generateRandomPos(width / 2, height / 2, max(width, height));
      this.endColor = color(0);
      this.isKilled = true;
    }
  }

  this.isOutOfBounds = function () {
    return (this.pos.x < 0 || this.pos.x > width ||
      this.pos.y < 0 || this.pos.y > height)
  }
}