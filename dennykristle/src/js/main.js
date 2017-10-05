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

    // initiate invitation viewer
    new Viewer( $('.invitation-list')[0], {
      url: function(img){
        return img.src;
      }
    });
    $('.invitation-list').click(function(){
      var viewer = new Viewer(this, {
        url: function(img){
          return img.src;
        }
      });
    });

    // initiate gallery viewer
    new Viewer( $('.gallery-list')[0], {
      url: function(img){
        return img.src;
      }
    });
    $('.gallery-list').click(function(){
      var viewer = new Viewer(this, {
        url: function(img){
          return img.src;
        }
      });
    });
  }


});