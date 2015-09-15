$('#index').show();

var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();

    Trello.members.get("me", function(member){
        $("#fullName").text(member.fullName);

        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo("#output");

        // Output a list of all of the cards that the member
        // is assigned to
        Trello.get("members/me/notifications", function(results) {
            console.log(results);
            $cards.empty();

            var $totalComments;

            $.each(results, function(ix, data)
            {
              if (data.type=='mentionedOnCard')
              {
                console.log(data.type);

                row = '<div class="row"><div class="commentCon"><div class="createrImg"><img class="avator" src="https://trello-avatars.s3.amazonaws.com/'+data.memberCreator.avatarHash+'/30.png"/></div><div class="inner"><span class="createrName">'+data.memberCreator.fullName+'</span><div class="replyInput"><p>'+data.data.text+'</p></div></div></div></div>';

                $('#output').append(row);
              }

                // $('<div>')
                // .addClass("row")
                // .text(card.name)
                // .appendTo($cards)
                // .click(function()
                // {
                //   Trello.post("cards/" + card.id + "/actions/comments",
                //   { text: "Hello from jsfiddle.net!" });
                // });


            });
        });
    });

};


var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);

    changePage('loggedin');

    if (isLoggedIn===false)
    {
      location.reload();
    }
};

var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};

Trello.authorize({
    interactive:false,
    success: onAuthorize
});

$("#connectLink")
.click(function(){
    Trello.authorize({
        type: "popup",
        success: onAuthorize
    });
});

$("#disconnect").click(logout);

function changePage(p){
  $('.page').hide();
  $('#'+p).show();
}

function getNoti(){
   Trello.get("members/me/notifications", function(cards) {
      console.log(cards);
      $cards.empty();
  });
}
