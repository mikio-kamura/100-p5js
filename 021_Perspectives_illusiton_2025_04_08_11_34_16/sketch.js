let textDiv;
let sketchTexture;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  sketchTexture = createGraphics(300, 300);
  drawGrid(sketchTexture);

  noStroke();
}

function draw() {
  background(220);

  texture(sketchTexture);

  camera(-180, 0, 700);

  push();
  translate(-130, 0, -450);
  box(100);
  pop();

  push();
  translate(-30, 0, -350);
  box(100);
  for (let i = 0; i < 7; i++) {
    translate(0, 0, 100);
    box(100);
  }
  pop();

  push();
  _renderer.GL.disable(_renderer.GL.DEPTH_TEST);
  resetMatrix();
  ortho(-width / 2, width / 2, -height / 2, height / 2, -1000, 1000);
  translate(-width / 2, -height / 2, 0);
  fill(100);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15);
  triangle(mouseX, mouseY + 50, mouseX - 8, mouseY + 10, mouseX + 8, mouseY + 10); _renderer.GL.enable(_renderer.GL.DEPTH_TEST);
  pop();
}

function drawGrid(graphics) {
  graphics.background(240);
  let cellSize = graphics.width / 3;

  graphics.stroke(200);
  graphics.strokeWeight(10);

  for (let i = 0; i < 4; i++) {
    let pos = i * cellSize;
    graphics.line(pos, 0, pos, graphics.height);
    graphics.line(0, pos, graphics.width, pos);
  }

  graphics.textSize(cellSize * 0.5);
  graphics.textAlign(CENTER, CENTER);
}