'use strict'



//random positie geven aan de particles
function generateRandomPos(x, y, mag) {
  let pos = new p5.Vector(x, y);

  let randomDirection = new p5.Vector(random(width), random(height));

  let vel = p5.Vector.sub(randomDirection, pos);
  vel.normalize();
  vel.mult(mag);
  pos.add(vel);

  return pos;
}


//particles maken en verwijderen zodat we genoeg hebben om een image te maken

function nextImage() {
  let newParticle

  imgIndex++;
  if (imgIndex > imgs.length - 1) {
    imgIndex = 0;
  }

  console.log(imgs)
  imgs[imgIndex].loadPixels();


  let particleIndexes = [];
  for (let i = 0; i < allParticles.length; i++) {
    particleIndexes.push(i);
  }

  let pixelIndex = 0;

  // Door de pixels van de image loopen en hun kleur opnemen
  for (let y = 0; y < imgs[imgIndex].height; y++) {
    for (let x = 0; x < imgs[imgIndex].width; x++) {

      let pixelR = imgs[imgIndex].pixels[pixelIndex];
      let pixelG = imgs[imgIndex].pixels[pixelIndex + 1];
      let pixelB = imgs[imgIndex].pixels[pixelIndex + 2];
      let pixelA = imgs[imgIndex].pixels[pixelIndex + 3];

      pixelIndex += 4;

      // Een kans geven om een particle aan zo'n pixel te assignen.
      if (random(1.0) > loadPercentage * resSlider.slider.value()) {
        continue;
      }

      let pixelColor = color(pixelR, pixelG, pixelB);

      //nieuwe particle maken of verwijderen
      if (particleIndexes.length > 0) {
        let index = particleIndexes.splice(random(particleIndexes.length - 1), 1);
        newParticle = allParticles[index];
      } else {
        newParticle = new Particle(width / 2, height / 2, 0);
        allParticles.push(newParticle);
      }

      newParticle.target.x = x + width / 2 - imgs[imgIndex].width / 2;
      newParticle.target.y = y + height / 2 - imgs[imgIndex].height / 2;
      newParticle.endColor = pixelColor;
    }
  }

  // particles verwijderen die niet assigned zijn aan een pixel
  if (particleIndexes.length > 0) {
    for (let i = 0; i < particleIndexes.length; i++) {
      allParticles[particleIndexes[i]].kill();
    }
  }
}

function goHome() {
  window.location.href = "index.html"
}