function Invitation(cb){

  $.ajax('https://spreadsheets.google.com/feeds/list/1Fx-eSEYYdBly3H1ojtsNOrxd9imTng6ZZXtwEwNGmVY/1/public/values?alt=json')
  .done(function(output){
    var invitation_names = output.feed.entry.map(function(row){
      var to_return = {};
      for(var key in row){
        to_return[key.replace('gsx$','')] = row[key].$t;
      }
      return to_return;
    });

    function getInviteeFromPassword(password){
      return invitation_names.filter(function(invitee){
        return invitee.password === password;
      })[0];
    }

    function getList(){
      return invitation_names;
    }

    cb({
      getInviteeFromPassword : getInviteeFromPassword,
      getPasswordFromURL : getPasswordFromURL,
      getURLFromPassword : getURLFromPassword,
      getList : getList
    });

  });

  // the url format is chenxeed.github.io/albertliana/index.html?o=password
  function getPasswordFromURL(url){
    return url.split('index.html?o=')[1];
  }

  function getURLFromPassword(password){
    return window.location.origin+'/teguhlily/index.html?o='+password;
  }

}