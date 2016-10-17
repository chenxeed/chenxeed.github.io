$(document).ready( function(e){

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