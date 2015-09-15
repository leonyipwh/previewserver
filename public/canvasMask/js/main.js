var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// var over = document.getElementById('over');
// var overCtx = over.getContext('2d');

// Create an image element
var img = document.createElement('img');
img.src = "img/img.jpg";

// Create an image element
var mask = document.createElement('img');
mask.src = "img/mask2.png";

var hair = document.createElement('img');
hair.src = "img/hair.png";

// When the image is loaded, draw it
img.onload = function () {

	// draw the shape we want to use for clipping
	ctx.drawImage(mask, 0, 0);

	// change composite mode to use that shape
	ctx.globalCompositeOperation = 'source-in';

	// draw the image to be clipped
	ctx.drawImage(img, 0, 0);

  ctx.globalCompositeOperation="source-over";
	ctx.drawImage(hair, 0, 0);
  ctx.save();

  // save canvas image as data url (png format by default)
  var dataURL = canvas.toDataURL();

  // set canvasImg image src to dataURL
  // so it can be saved as an image
  document.getElementById('result').src = dataURL;
};


$( "#over" ).click(function() {
  alert( "Handler for .click() called." );
});
