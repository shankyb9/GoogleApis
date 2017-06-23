var channelName = 'GoogleDevelopers';  // set the channel name

$(document).ready(function(){
  $.get(
    "https://www.googleapis.com/youtube/v3/channels",{
      part: 'contentDetails',
      forUsername:channelName,
      key:'AIzaSyA8hCexWJv510lPuDPWpBVnAHisBJOl6UY'
    },
    function(data){
      $.each(data.items, function(i,item){
        //console.log(item);
        var pid = item.contentDetails.relatedPlaylists.uploads;
        getVids(pid);
      });
    }
  );

  function getVids(pid){
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",{
        part: 'snippet',
        maxResults:10,
        playlistId:pid,
        key:'AIzaSyA8hCexWJv510lPuDPWpBVnAHisBJOl6UY'
      },
      function(data){
        var output;
        $.each(data.items, function(i,item){
          //console.log(item);
          var videoTitle = item.snippet.title;
          var videoId = item.snippet.resourceId.videoId;

          output = '<li><iframe src="//www.youtube.com/embed/'+videoId+'"></iframe></li>';

          // Append to results List
          $('#results').append(output);

        });
      }
    );
  }

});


// Use your own key
