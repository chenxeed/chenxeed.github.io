$(document).ready(function(){

  Invitation(function(invitation){

    var $lists = $('div#invitee-list');

    var invitee_by_origin = invitation.getList().reduce(function(prev, invitee){
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
          var url = invitation.getURLFromPassword( invitee.password );
          var show_name = invitee.notes.toLowerCase().indexOf('ok') === 0 ?
            '<strike>'+invitee.name+'</strike>' : invitee.name
          return prev+'| <span><a href="'+url+'" target="_blank">'+show_name+'</a></span> ';
        }, '');
        $lists.append('<div>'+title_html+'<div style="overflow:auto" class="accordion-content">'+invitee_html+'</div></div>');

      }
    }

  })
  
});