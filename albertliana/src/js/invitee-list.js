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
      $lists.append('<h1>'+origin+'</h1>');
      var invitee_list = invitee_by_origin[origin];
      invitee_list.forEach(function(invitee){
        var url = getURLFromShorten( toShorten(invitee.name, invitee.origin) );
        $lists.append(
          '| <span><a href="'+url+'" target="_blank">'+invitee.name+'</a></span> '
        );
      });

    }
  }

  
});