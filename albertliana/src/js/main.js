// initialize masonry for gallery
var msnry = new Masonry( '.gallery-list', {
  // options
  itemSelector: '.gallery-list > div',
  gutter: 10
});

// scroll into tab
$('.tab-title').click(function(e){
  setTimeout(function(){
    $(window).scrollTo(e.currentTarget, 500);
  }, 600);
});

// initiate modal
$('#openMapMatrimony').animatedModal();
$('#openMapReception').animatedModal();