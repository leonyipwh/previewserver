window.onload = function() {
  var fileInput = document.getElementById('fileUpload');
  fileInput.onchange = function() {
    var file = fileInput.files[0];
    // MegaPixImage constructor accepts File/Blob object.
    var mpImg = new MegaPixImage(file);

    // Render resized image into image element using quality option.
    // Quality option is valid when rendering into image element.
    // var resImg = document.getElementById('resultImage');
    // mpImg.render(resImg, { maxWidth: 300, maxHeight: 300, quality: 0.5 });
    //
    // // Render resized image into canvas element.
    // var resCanvas1 = document.getElementById('resultCanvas1');
    // mpImg.render(resCanvas1, { maxWidth: 300, maxHeight: 300 });

    // Render resized image into canvas element, rotating orientation = 6 (90 deg rotate right)
    // Types of orientation is defined in EXIF specification.
    // To detect orientation of JPEG file in JS, you can use exif.js from https://github.com/jseidelin/exif-js
    var resCanvas2 = document.getElementById('resultCanvas2');
    mpImg.render(resCanvas2, {maxWidth: 1000, maxHeight: 1000, quality: 1, orientation: 6 });

    setTimeout("draw()",1000);
  };
};

//kinetic.js
var degree=0;

var stage = new Kinetic.Stage
({
  container: 'canvasContainer',
  width: width,
  height: canvasHeight
});

var layer = new Kinetic.Layer();

$( "#fileUpload" ).click(function()
{
  this.value = null;
});

$( "#fileUpload" ).change(function()
{
  layer.destroy();

  // $("#uploadingText").html("載入中");
  $("#preloaderContainer").show();
  /* draw(); */
});


function draw()
{
  var imageObj = new Image();

  imageObj.src = document.getElementById("resultCanvas2").toDataURL("image/png",1);

  degree = 0;
  $("#preloaderContainer").show();

  imageObj.onload = function()
  {
    oriImgHeight = imageObj.height;
    oriImgWidth = imageObj.width;

    //zoom ratio
    var zw = width/oriImgWidth;
    var zh = canvasHeight/oriImgHeight;
    console.log("zw= " + zw);
    console.log("zh= " + zh);

    currentZ = Math.max(zw, zh);

    minZ = currentZ;

    ratioImgWidth = minZ*oriImgWidth;
    ratioImgHeight = minZ*oriImgHeight;
    editedHeight = ratioImgHeight;

    ratio = oriImgWidth/oriImgHeight;

    wideWidth = (canvasHeight*ratio);

    minX = -((ratioImgWidth-width)/2 - width/2);
    maxX = ((ratioImgWidth-width)/2 + width/2);
    minY = -((ratioImgHeight-canvasHeight)/2 - canvasHeight/2);
    maxY = ((ratioImgHeight-canvasHeight)/2 + canvasHeight/2);

    oriX = ((stage.getWidth()/2)-(ratioImgWidth/2)+ratioImgWidth/2);
    oriY = ((stage.getHeight()/2)-(ratioImgHeight/2)+ratioImgHeight/2);

    myImage = new Kinetic.Image
    ({
      image: imageObj,
      width: ratioImgWidth,
      height: editedHeight,
      x: oriX,
      y: oriY,
      offsetX:ratioImgWidth/2,
      offsetY:ratioImgHeight/2,
      draggable: true,
      dragBoundFunc: function (pos)
      {
        var X = pos.x;
        var Y = pos.y;
        if (X < minX) {
            X = minX;
        }
        if (X > maxX) {
            X = maxX;
        }
        if (Y < minY) {
            Y = minY;
        }
        if (Y > maxY) {
            Y = maxY;
        }
        return ({
            x: X,
            y: Y
        });
      }
    });
    layer.add(myImage);
    stage.add(layer);
  };

  stage.draw();
  $("#preloaderContainer").hide();
  $("#editPhoto").show();
}

function canvasRotate()
{
  stage.clear();

  degree+=90;
  console.log("width= " + width);

  myImage.rotateDeg(90);

  if (degree==90)
  {
    rotate90();
  }
  else if(degree==180)
  {
    rotate180();
  }
  else if(degree==270)
  {
    rotate90();
  }
  else if(degree==360)
  {
    rotate180();
    degree=0;
  }

  console.log("degree= " + degree);

  stage.draw();
}

function rotate90()
{
  var zw = width/oriImgHeight;
  var zh = canvasHeight/oriImgWidth;
  console.log("zw= " + zw);
  console.log("zh= " + zh);

  currentZ = Math.max(zw, zh);

  minZ = currentZ;

  ratioImgWidth = minZ*oriImgHeight;
  ratioImgHeight = minZ*oriImgWidth;

  console.log("ratioImgWidth= " + ratioImgWidth);

  myImage.width(ratioImgHeight);
  myImage.height(ratioImgWidth);

  oriY = ((stage.getWidth()/2)-(ratioImgWidth/2)+ratioImgWidth/2);
  oriX = ((stage.getHeight()/2)-(ratioImgHeight/2)+ratioImgHeight/2);

  myImage.setX(oriY);
  myImage.setY(oriX);

  myImage.setOffsetX(ratioImgHeight/2);
  myImage.setOffsetY(ratioImgWidth/2);

  dragFunction();
}

function rotate180()
{
  //zoom ratio
  var zw = width/oriImgWidth;
  var zh = canvasHeight/oriImgHeight;
  console.log("zw= " + zw);
  console.log("zh= " + zh);

  currentZ = Math.max(zw, zh);

  minZ = currentZ;

  ratioImgWidth = minZ*oriImgWidth;
  ratioImgHeight = minZ*oriImgHeight;

  myImage.width(ratioImgWidth);
  myImage.height(editedHeight);

  console.log(minZ);

  oriX = ((stage.getWidth()/2)-(ratioImgWidth/2)+ratioImgWidth/2);
  oriY = ((stage.getHeight()/2)-(ratioImgHeight/2)+ratioImgHeight/2);

  myImage.setX(oriX);
  myImage.setY(oriY);

  myImage.setOffsetX(ratioImgWidth/2);
  myImage.setOffsetY(ratioImgHeight/2);

  dragFunction();
}

function dragFunction()
{
  minX = -((stage.scale().x*ratioImgWidth-width)/2 - width/2);
  maxX = ((stage.scale().x*ratioImgWidth-width)/2 + width/2);
  minY = -((stage.scale().y*ratioImgHeight-canvasHeight)/2 - canvasHeight/2);
  maxY = ((stage.scale().y*ratioImgHeight-canvasHeight)/2 + canvasHeight/2);

  myImage.setDragBoundFunc(function(pos, event)
  {
  var X = pos.x;
  var Y = pos.y;

  if (X < minX) {
      X = minX;
  }
  if (X > maxX) {
      X = maxX;
  }
  if (Y < minY) {
      Y = minY;
  }
  if (Y > maxY) {
      Y = maxY;
  }

  return ({
      x: X,
      y: Y
  });
  // return pos.x;
  });
}

function zoomImage()
{
  var curScaleX = myImage.scale().x;
  var zoomOutFactor = curScaleX + 0.3;

  var zoomRatio = Math.min(zoomOutFactor, 5);

  var newZoomInScale = {
    x: zoomRatio,
    y: zoomRatio
  };
  myImage.scale(newZoomInScale);
  dragFunction();
  stage.draw();
}

function zoomOutImage()
{
  var curScaleX = myImage.scale().x;
  var zoomOutFactor = curScaleX - 0.3;

  var zoomRatio = Math.max(zoomOutFactor, 1);

  var newZoomInScale = {
    x: zoomRatio,
    y: zoomRatio
  };
  myImage.scale(newZoomInScale);
  dragFunction();
  stage.draw();
}

function getDistance(p1, p2)
{
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

stage.getContent().addEventListener('touchend', function()
{
  lastDist = 0;
}, false);

stage.getContent().addEventListener('touchmove', function(evt)
{
  console.log(myImage.scaleX());
  console.log(myImage.scaleY());

  var touch1 = evt.touches[0];
  var touch2 = evt.touches[1];
  var startScale = "";

  if(touch1 && touch2)
  {
    var dist = getDistance({
        x: touch1.clientX,
        y: touch1.clientY
    }, {
        x: touch2.clientX,
        y: touch2.clientY
    });

    if(!lastDist) {
        lastDist = dist;
    }

    var scale = {
        x: stage.scale().x * dist / lastDist,
        y: stage.scale().y * dist / lastDist
    };

    if ((stage.scale().x * dist / lastDist)>1 || (stage.scale().y * dist / lastDist)>1)
    {
      stage.scale(scale);

      dragFunction();

      stage.draw();
      lastDist = dist;
    }
  }

}, false);
