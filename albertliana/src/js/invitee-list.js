$(document).ready(function(){

  var $lists = $('div#invitee-list');

  var invitee_by_origin = invitation_names.reduce(function(prev, invitee){
    if(prev[invitee.origin]) {
      prev[invitee.origin].push(invitee);
    } else {
      prev[invitee.origin] = [invitee];
    }
    return prev;
  }, {});

  for (var origin in invitee_by_origin) {
    if (invitee_by_origin.hasOwnProperty(origin)) {
      var safe_origin = origin.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
      var title_html =
        '<input class="accordion-toggle-checkbox" id="toggle-'+safe_origin+'" type="checkbox" />'+
        '<label class="tab-title" for="toggle-'+safe_origin+'">'+
          '<span class="accordion-list-style">&#9656;</span>'+origin+
        '</label>'
      ;
      var invitee_list = invitee_by_origin[origin];
      var invitee_html = invitee_list.reduce(function(prev, invitee){
        var url = getURLFromShorten( toShorten(invitee.name, invitee.origin) );
        return prev+'| <span><a href="'+url+'" target="_blank">'+invitee.name+'</a></span> ';
      }, '');
      $lists.append('<div>'+title_html+'<div class="accordion-content">'+invitee_html+'</div></div>');

    }
  }

  
});