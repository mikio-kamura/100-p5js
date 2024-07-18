//------- Condortable p5 world :))))) -------//

let canvas;

let sketch = function(p) {
  let image = [];
  let pointer = [];
  let testImage = [];
  let finPosX = [];
  let finPosY = [];
  let thumbRootX = [];
  let thumbRootY = [];
  let flag = 1;
  let imageNum = 0;
  let handImage = [];
  
  let buttonCenterX = 440;
  let buttonCenterY = 80;
  let buttonWidth = 80;
  let buttonHeight = 30;
  
  let buttonFinger = [];
  
  let fingerDist;
  let glispLevel;
  let handImgWid = 440;
  let handImgHei = 420;

  
  p.setup = function(){
    // cannot use p.preload so load here using callback...
    p.loadImage('mousePointer/mouse_cursor_048.png', function(loadedImage) {
      testImage[0] = loadedImage;
    });
    p.loadImage('mousePointer/mouse_cursor_150.png', function(loadedImage) {
      testImage[1] = loadedImage;
    });
  
    // load hand images
    { 
      p.loadImage('hands/1.jpg', function(loadedImage){
        handImage[0] = loadedImage;
      })
      p.loadImage('hands/2.jpg', function(loadedImage){
        handImage[1] = loadedImage;
      })
      p.loadImage('hands/3.jpg', function(loadedImage){
        handImage[2] = loadedImage;
      })
      p.loadImage('hands/4.jpg', function(loadedImage){
        handImage[3] = loadedImage;
      })
      p.loadImage('hands/5.jpg', function(loadedImage){
        handImage[4] = loadedImage;
      })      
      p.loadImage('hands/6.jpg', function(loadedImage){
        handImage[5] = loadedImage;
      })    
      p.loadImage('hands/7.jpg', function(loadedImage){
        handImage[6] = loadedImage;
      })    
      p.loadImage('hands/8.jpg', function(loadedImage){
        handImage[7] = loadedImage;
      })   
      p.loadImage('hands/9.jpg', function(loadedImage){
        handImage[8] = loadedImage;
      })
      p.loadImage('hands/10.jpg', function(loadedImage){
        handImage[9] = loadedImage;
      })
      p.loadImage('hands/11.jpg', function(loadedImage){
        handImage[10] = loadedImage;
      })
      p.loadImage('hands/12.jpg', function(loadedImage){
        handImage[11] = loadedImage;
      })
      p.loadImage('hands/13.jpg', function(loadedImage){
        handImage[12] = loadedImage;
      })
      p.loadImage('hands/14.jpg', function(loadedImage){
        handImage[13] = loadedImage;
      })
      p.loadImage('hands/15.jpg', function(loadedImage){
        handImage[14] = loadedImage;
      })
      p.loadImage('hands/16.jpg', function(loadedImage){
        handImage[15] = loadedImage;
      })
      p.loadImage('hands/17.jpg', function(loadedImage){
        handImage[16] = loadedImage;
      })
      p.loadImage('hands/18.jpg', function(loadedImage){
        handImage[17] = loadedImage;
      })
    }
    canvas = p.createCanvas(880, 640);
    canvas.id("canvas");
    
    // mode settings
    {
    p.blendMode(p.ADD);
    p.rectMode(p.RADIUS);
    p.imageMode(p.CENTER);
    }
    for(i=0;i<2;i++){
      buttonFinger[i] = [];
      for(j=0;j<5;j++){
        buttonFinger[i][j] = 0;
      }
    }
  }

  p.draw = function(){
    // p.background(246,3*(p.sin(p.frameCount*0.01)+1));
    p.clear();
      
    p.blendMode(p.ADD);
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined){
        p.stroke(0, 0, 255);
        p.strokeWeight(3);

        p.calcFingerPos();
        p.interaction(flag);
      }
    }
  }
  
  p.calcFingerPos = function(){
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      finPosX[i] = [];
      finPosY[i] = [];
      for(let j=0; j<5;j++){
        finPosX[i][j] = p.width - detections.multiHandLandmarks[i][4*(j+1)].x * p.width;
        finPosY[i][j] = detections.multiHandLandmarks[i][4*(j+1)].y * p.height;
      }
      thumbRootX[i] = p.width - detections.multiHandLandmarks[i][2].x * p.width;
      thumbRootY[i] = detections.multiHandLandmarks[i][2].y * p.height;
    }
  }
  
  p.drawFingerCircle = function(i,fingerNum){
    p.ellipse((finPosX[i][0]+finPosX[i][fingerNum] )/2, (finPosY[i][0]+finPosY[i][fingerNum])/2, p.dist(finPosX[i][0], finPosY[i][0], finPosX[i][fingerNum], finPosY[i][fingerNum]));
  }

  p.drawFingersCircles = function(){ 
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      // index finger
      p.fill(30,30,130)
      p.drawFingerCircle(i,1);
      // middle finger 
      p.fill(100,50,50)
      p.drawFingerCircle(i,2);
      // ring finger 
      p.fill(50,100,50)
      p.drawFingerCircle(i,3);
      // pinky finger 
      p.fill(30,30,80)
      p.drawFingerCircle(i,4);
    }
  }
  
  p.detectPressButton = function() {
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<5;j++){
        if(p.dist(buttonCenterX, buttonCenterY, finPosX[i][j],finPosY[i][j]) < buttonWidth) {
          buttonFinger[i][j] = 1;
          if(p.dist(buttonCenterX, buttonCenterY, finPosX[i][j],finPosY[i][j]) < 20){
            flag = 3;
          }
        }else{
          buttonFinger[i][j] = 0;
        }
      }
    }
  }
  
  p.detectFingerTouched = function(){
    if(p.dist(finPosX[0][0],finPosY[0][0], finPosX[0][1],finPosY[0][1]) < 13){
      flag = 2;
    }
  }
  
  p.interactWithImageHand = function(){
    fingerDist = p.dist(thumbRootX[0],thumbRootY[0], finPosX[0][1],finPosY[0][1]);
    glispLevel = p.int(p.map(fingerDist, 50, 280, 2, 16));
    console.log(`glispLevel=${glispLevel}`);
    console.log(`fingerDist=${fingerDist}`);
    if(handImage[glispLevel]){
      p.image(handImage[glispLevel], handImgWid, handImgHei);
    }
  }
  
  p.detectGlisped = function(){
    if(glispLevel == 16){
      flag = 1;
    }
  }
  
  p.fingerMousePointers = function(){
   for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<5;j++){
        // console.log(`buttonFinger[${i}][${j}]: ${buttonFinger[i][j]}`);
        if(buttonFinger[i][j]==1){
          p.image(testImage[1],finPosX[i][j],finPosY[i][j]);  
        }else{
          p.image(testImage[0],finPosX[i][j],finPosY[i][j]);  
        }
      }
    }
  }
  
  p.drawButton = function() {
    p.fill(100,100,100);
    p.rect(buttonCenterX, buttonCenterY, buttonWidth, buttonHeight);
  }
  
  p.interaction = function(flag,imageNum) {
    if(flag == 1){
      p.drawFingersCircles();
      p.detectFingerTouched();
    }else if(flag == 2){
      p.drawButton();
      p.fingerMousePointers();
      p.detectPressButton();
    }
    else if(flag == 3){
      p.interactWithImageHand();
      p.detectGlisped();
    }
  }
  
  //==
   // MediaPipe Hands の結果を受け取るコールバック
  hands.onResults(onResults);

  p.onResults = function(results) {
     // clear();
     // p.image(video, 0, 0, p.width, p.height);  
     // 手のランドマークを描画（オプション）
      drawLandmarks(results);
  }
  //==
}

let myp5 = new p5(sketch);



