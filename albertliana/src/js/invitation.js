function Invitation(cb){
  // https://spreadsheets.google.com/feeds/list/1R1NNKhsgBReG9dYC0ZjYqqQG2ZS5olUaw3yz_VTo2zc/1/public/values?alt=json-in-script
  
  $.ajax('https://spreadsheets.google.com/feeds/list/1R1NNKhsgBReG9dYC0ZjYqqQG2ZS5olUaw3yz_VTo2zc/1/public/values?alt=json')
  .done(function(output){
    var invitation_names = output.feed.entry.map(function(row){
      var to_return = {};
      for(var key in row){
        to_return[key.replace('gsx$','')] = row[key].$t;
      }
      return to_return;
    });

    function getInviteeFromShorten(shorten){
      return invitation_names.filter(function(invitee){
        return toShorten(invitee.name, invitee.origin) === shorten;
      })[0];
    }

    function getList(){
      return invitation_names;
    }

    cb({
      getInviteeFromShorten : getInviteeFromShorten,
      toShorten : toShorten,
      getShortenFromURL : getShortenFromURL,
      getURLFromShorten : getURLFromShorten,
      getList : getList
    });

  });

  function toShorten(name, origin){
    return encodeURIComponent(
      name.toLowerCase().split('').reverse().join('')+
      '-'+
      origin.toLowerCase().split('').reverse().join('')
    );
  }

  // the url format is chenxeed.github.io/albertliana/index.html?o=shorten
  function getShortenFromURL(url){
    return url.split('index.html?o=')[1];
  }

  function getURLFromShorten(shorten){
    return window.location.origin+'/albertliana/index.html?o='+shorten;
  }

}