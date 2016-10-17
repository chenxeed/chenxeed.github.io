$(document).ready( function(e){

  // validate if visitor have correct ID
  var shorten = getShortenFromURL( window.location.href );
  var invitee = getInviteeFromShorten(shorten);
  if(!invitee){
    $('#visitorInfoWrapper').show();
    $('#openVisitorInfo').animatedModal();
    $('#openVisitorInfo').click();
    return;
  } else {
    $('#visitorInfoWrapper').remove();
    $('#inviteeName').text(invitee.name);
  }

  // scroll into tab
  $('.tab-title').click(function(e){
    setTimeout(function(){
      $(window).scrollTo(e.currentTarget, 500);
    }, 600);
  });

  // initiate modal
  $('#openMapMatrimony').animatedModal();
  $('#openMapReception').animatedModal();

  // viewer
  new Viewer( $('.gallery-list')[0], {
    url: function(img){
      return img.src.replace('_tn', '');
    }
  });
  $('.gallery-list').click(function(){

    var viewer = new Viewer(this, {
      url: function(img){
        return img.src.replace('_tn', '');
      }
    });

  });


});