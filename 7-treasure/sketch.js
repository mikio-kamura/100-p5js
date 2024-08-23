let tileWidth;
let tileNum = 10;
let r;

function setup() {
  createCanvas(windowWidth, windowHeight);

  tileWidth = width / tileNum;
}

function draw() {
  background(220);
  for (let x = 0; x < width + tileWidth; x += tileWidth) {
    for (let y = 0; y < height + tileWidth; y += tileWidth) {
      r = mouseY / 3;
      noFill();
      strokeWeight(map(mouseX, 0, width, 0, 15));
      stroke(100);
      ellipse(x, y, r);
    }
  }
}
