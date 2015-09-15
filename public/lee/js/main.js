$(document).ready(function(){
		var width = $(window).width();
		var height = width/(970/450);
		$('#video').attr('height',height);

		if (width==320) {
			console.log('iphone 5 resize');
			// $('body').height($('body').height()-302);
			$('#login #inputCon').css('margin-top','10px');
			$('#top').css('position','absolute');
		}
		else{
	    skrollr.init();
		}

		// var docHeight = $(document).height();
		// $('#bg').height(docHeight);
		// $(html).height(docHeight-500);

		// var fade = 'hide';
		// setInterval(function(){
		// 	if (fade=='show') {
		// 		$('#fading').fadeIn(1000);
		// 		fade='hide';
		// 	}else{
		// 		$('#fading').fadeOut(1000);
		// 		fade='show';
		// 	}
		// }, 4000);
});

function login()
{
  var name = $("#username").val();
  var pw = $("#pw").val();

  console.log(name+ '  ' + pw);

  if (name=="lee"&&pw=="lee")
  {
    $("#login").hide();

    $("body").css({
      "overflow":"auto"
    });

    	$( "body" ).animate({
    		scrollTop: 0
    	}, 0, function() {
    		// Animation complete.
    	});
  }
  else
  {
    alert("Please insert correct username and passward");
  }
}

// function fading(){
// 	$('#fading').fadeIn(1000).delay(4000).fadeOut(1000);
// }
