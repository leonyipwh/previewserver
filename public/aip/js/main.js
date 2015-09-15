$(document).ready(function(){
	var width = $(window).width();
	var height = width/(970/450);
	$('#video').attr('height',height);
});

function login()
{
  var name = $("#username").val();
  var pw = $("#pw").val();

  console.log(name+ '  ' + pw);

  if (name=="aip"&&pw=="aip")
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
