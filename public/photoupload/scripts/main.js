var editedHeight;
var width = $(window).width();
var canvasWidth = $(window).width();
var height = $(window).height();
var canvasHeight = width * 590/945;

var hair = document.createElement('img');
hair.src = "images/hair.png";

var mask = document.createElement('img');
mask.src = "images/mask2.png";

function toPreviewPage()
{
  stage.toDataURL
  ({
    mimeType: "image/png",
    quality: 1.0,
    callback: function(dataUrl)
    {
      $('#previewPng').attr('src', dataUrl);
      $(".page").hide();
      $("#previewPage").show();
      $('#baseCode').val(dataUrl);

      finalView(dataUrl);
    }
  });

  $('#previewPng').width(width);
  $('#previewPng').height(canvasHeight);
}

function changePage(pageName)
{
  $(".page").hide();
  $(pageName).show();
}

function finalView(dataUrl)
{
  $('#finalCanvas').width(canvasWidth);
  $('#finalCanvas').height(canvasHeight);

  var finalCanvas = document.getElementById('finalCanvas');
  finalCanvas.width=canvasWidth;
  finalCanvas.height=canvasHeight;
  var final_ctx = finalCanvas.getContext('2d');

  // mask
	final_ctx.drawImage(mask, 0, 0,canvasWidth, canvasHeight);
	// change composite mode to use that shape
	final_ctx.globalCompositeOperation = 'source-in';
	// target img
	final_ctx.drawImage(previewPng, 0, 0,canvasWidth, canvasHeight);

  // overlay
  final_ctx.globalCompositeOperation="destination-over";
  final_ctx.drawImage(hair, 0, 0, canvasWidth, canvasHeight);
  final_ctx.save();

  var dataURL = finalCanvas.toDataURL();

  document.getElementById('finalPng').src = dataURL;

  var finalPng = document.getElementById('finalPng');

  FastClick.attach(finalPng);

  finalPng.addEventListener("click", mouseDown, false);
}

var mouseIsDown = 0;
function mouseDown(){
  mouseIsDown++;
  $('#tapCount').html(mouseIsDown);
  if (mouseIsDown%2==1)
  {
    $('#bodyTrans').attr('src',imageURL+'a.jpg');
  }
  else{
    $('#bodyTrans').attr('src',imageURL+'b.jpg');
  }
}


function preload(page,x) {

  $('#preloaderContainer').show();

	$('#aniGif').removeClass('aniGif');

  var preloadDiv = document.createElement('div');
  document.body.appendChild(preloadDiv);

	// set image list
	images = new Array();

	for (var i = 0; i < x.length; i++) {
		images.push(x[i]);
	}

	var totalImg = images.length;

	//multi prelaod
	for (var i = 0; i < images.length; i++) {
		var preloadImg = new Image();
    preloadDiv.id = 'preloadImg';
		preloadImg.src = images[i];
		$(preloadImg).addClass('preloadImg');
		preloadImg.setAttribute('id', 'preloadImg' + i);
		$('#preloadImg').append(preloadImg);
	}

	var preloadImgNum = 0;

	var preloadCount = function() {

		$('.preloadImg').load(function() {
			var id = $(this).attr('id');
			preloadImgNum++;

			var percent = Math.round(preloadImgNum / totalImg * 100);
			progress(percent, $('#progressBar'));

			if (preloadImgNum == totalImg) {
        $('#preloaderContainer').hide();
        document.getElementById("preloadImg").remove();
			}
		});
	};

	preloadCount();
	progress(0, $('#progressBar'));
}

function progress(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	// $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
	$element.find('div').animate({
		width: progressBarWidth
	});
}
