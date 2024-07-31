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
  let pickImage = [];
  
  let pickLevel;
  
  let fingerDist;
  let glispLevel;
  let handImgWid = 440;
  let handImgHei = 420;
  let pickImgWid = 440;
  let pickImgHei = 420;

  
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
    {
      p.loadImage('picking/01.jpg', function(loadedImage){
        pickImage[0] = loadedImage;
      })
      p.loadImage('picking/02.jpg', function(loadedImage){
        pickImage[1] = loadedImage;
      })
      p.loadImage('picking/03.jpg', function(loadedImage){
        pickImage[2] = loadedImage;
      })
      p.loadImage('picking/04.jpg', function(loadedImage){
        pickImage[3] = loadedImage;
      })
      p.loadImage('picking/05.jpg', function(loadedImage){
        pickImage[4] = loadedImage;
      })
      p.loadImage('picking/06.jpg', function(loadedImage){
        pickImage[5] = loadedImage;
      })
      p.loadImage('picking/07.jpg', function(loadedImage){
        pickImage[6] = loadedImage;
      })
      p.loadImage('picking/08.jpg', function(loadedImage){
        pickImage[7] = loadedImage;
      })
      p.loadImage('picking/09.jpg', function(loadedImage){
        pickImage[8] = loadedImage;
      })
      p.loadImage('picking/10.jpg', function(loadedImage){
        pickImage[9] = loadedImage;
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
    p.ellipse((finPosX[i][0]+finPosX[i][fingerNum])/2, (finPosY[i][0]+finPosY[i][fingerNum])/2, p.dist(finPosX[i][0], finPosY[i][0], finPosX[i][fingerNum], finPosY[i][fingerNum]));
  }
  // flag 1
  {
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
  
    p.detectFingerTouched = function(){
      if(p.dist(finPosX[0][0],finPosY[0][0], finPosX[0][1],finPosY[0][1]) < 13){
        flag = 2;
      }
    }
  }
  
  // flag 2
  p.movePicking = function(){
    if (finPosX[0][1]){
      pickLevel = p.int(p.map(finPosX[0][1], 0, p.width, 0, 9));
    }
    if(pickImage[pickLevel]){
      p.image(pickImage[pickLevel], pickImgWid, pickImgHei, 800, 600);
    }else{
      console.log("not found", pickLevel);
    }
  }
  
  p.detectPickEnd =  function(){
    if (pickLevel == 9){
      flag = 3;
    }
  }
  
  // flag 3
  {
    p.interactWithImageHand = function(){
      fingerDist = p.dist(thumbRootX[0],thumbRootY[0], finPosX[0][1],finPosY[0][1]);
      glispLevel = p.int(p.map(fingerDist, 50, 280, 16, 2));
      // console.log(`glispLevel=${glispLevel}`);
      // console.log(`fingerDist=${fingerDist}`);
      if(handImage[glispLevel]){
        p.image(handImage[glispLevel], handImgWid, handImgHei);
      }
    }

    p.detectGlisped = function(){
      if(glispLevel == 16){
        flag = 1;
      }
    }
  }
  

  p.interaction = function(flag,imageNum) {
    if(flag == 1){
      p.drawFingersCircles();
      p.detectFingerTouched();
    }else if(flag == 2){
      p.movePicking();
      p.detectPickEnd();
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



