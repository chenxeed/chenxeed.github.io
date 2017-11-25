$(document).ready( function(e){

  initViews();

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

    // initiate masonry on gallery
    $('.gallery-list').masonry({
      columnWidth: '.gallery-list .grid-sizer',
      gutter: '.gallery-list .gutter-sizer',
      percentPosition: true
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