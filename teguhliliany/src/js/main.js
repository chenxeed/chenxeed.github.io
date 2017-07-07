$(document).ready( function(e){

  // validate if visitor have correct ID
  Invitation(function(invitation){


    var password = invitation.getPasswordFromURL( window.location.href );
    var invitee = invitation.getInviteeFromPassword(password);
    if(!invitee){
      $('#visitorInfoWrapper').show();
      $('#openVisitorInfo').animatedModal();
      $('#openVisitorInfo').click();
      return;
    } else {
      $('#visitorInfoWrapper').remove();
      $('#inviteeName').text(invitee.name);
      initViews();
    }

    setTimeout(function(){
      $('#loadingWrapper').fadeOut(500);
    }, 100);
  });

  function initViews(){

    // scroll into tab
    $('.tab-title').click(function(e){
      setTimeout(function(){
        $(window).scrollTo(e.currentTarget, 500);
      }, 600);
    });

    // initiate modal
    $('#openMapMatrimony').animatedModal({color: 'rgb(78, 78, 78)'});
    $('#openMapReception').animatedModal({color: 'rgb(78, 78, 78)'});

  }


});