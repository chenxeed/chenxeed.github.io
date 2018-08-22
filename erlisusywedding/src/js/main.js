document.addEventListener("DOMContentLoaded", function(event) {

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

    // play the music
    var sound = new Howl({
      src: ['src/audio/song.mp3', 'src/audio/song.ogg'],
      autoplay: true,
      loop: true,
      volume: 0.5
    });
    $('.music.music-play').hide();
    $('.music.music-pause').on('click', function(){
      sound.pause();
      $('.music.music-pause').hide();
      $('.music.music-play').show();
    });
    $('.music.music-play').on('click', function(){
      sound.play();
      $('.music.music-play').hide();
      $('.music.music-pause').show();
    });

    // init flipclock
    // Grab the current date
    var currentDate = new Date();
    // Set some date in the future. In this case, it's always Jan 1
    var futureDate  = new Date(2018, 8, 18);
    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    // Only show countdown when the countdown hasn't reach 0
    if( diff > 0 ) {
      $('.countdown').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown : true
      });
    }

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

    // initiate masonry on gallery
    var $gallery = $('.gallery-list').masonry({
      columnWidth: '.gallery-list .grid-sizer',
      gutter: '.gallery-list .gutter-sizer',
      percentPosition: true
    });
    $('#toggle-gallery').on('click', function(){
      $gallery.masonry('layout');
    })

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