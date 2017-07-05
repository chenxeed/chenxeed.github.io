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

    // gallery list
    $('.gallery-list').masonry({
      itemSelector: 'div',
      gutter: 10,
      fitWidth: true
    });

    // viewer
    
    // initialize it first to make it can open on first click
    // .... don't ask me why :p
    new Viewer( $('.gallery-list')[0], {
      url: function(img){
        return img.src;
      }
    });
    // open the viewer on click
    $('.gallery-list').click(function(){

      var viewer = new Viewer(this, {
        url: function(img){
          return img.src;
        }
      });

    });

  }


});