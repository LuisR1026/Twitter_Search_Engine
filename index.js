const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')

const apikey = 'szFR82mjD2WGailpFHTJuqUBB'
const apiSecretKey = '9PnhvQ71HZnU2p0G25AmZABLYLzJeaMtsrhzZ8Ffs5TiV2ao8h'
const accessToken = '1013749659573968896-SGUYFofhohhJfYrxLL2MDJxQgkK7fR'
const accessTokenSecret = 'sQJe4TefYYyFzGYC331v9E9YLnXWnrqKBoP5KtS1HEqLE'

var T = new Twit({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

(async () => {


  // Pulling all the information 
     T.get('search/tweets', { q: 'covid since:2021-01-02', count: 10 }, function(err, data, response) {
       const tweets = data.statuses
       console.log(tweets);
     })

  /*//Pull tweets depending on incidents 
  T.get("search/tweets",{ q: "#alert since:2021-01-01", count: 100 },
    function (err, data, response) 
    {
      const tweets = data.statuses;
      tweets.map((tweet) => 
      {
        if (tweet.user.verified == true) 
        {
          console.log("tweet: " + tweet.text +
            "\n" + "created: "  + tweet.created_at +
            "\n" + "username: " + tweet.user.screen_name +
            "\n" + "location: " + tweet.user.location +
            "\n" + "verified: " + tweet.user.verified +
            "\n----------------");
        }
      });
    }
  );*/




  //Real time monitoring
  var latlong = [ '-122.75', '36.8', '-121.75', '37.8']
  var stream = T.stream('statuses/filter', { track: 'trump' , locations: latlong })
  stream.on('tweet', function (tweet) 
  {
    if (tweet.user.verified == true ) 
    {
      console.log("tweet: " + tweet.text 
                            + "\n" + "created: " + tweet.created_at
                            + "\n" + "username: @" + tweet.user.screen_name
                            + "\n" + "location: " + tweet.user.location 
                            + "\n" + "verified: " + tweet.user.verified + "\n----------------");
    }
  })

  /*// 3. REAL TIME MONITORING USING STREAM (LOCATION)
 var latlong = [ '-122.75', '36.8', '-121.75', '37.8' ]
 var stream = T.stream('statuses/filter', { locations: latlong })
 
 //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
 stream.on('tweet', function (tweet) {
   console.log(tweet.text);
   let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

   notifier.notify({
     title: tweet.user.name,
     message: tweet.text,
   });

   notifier.on('click', async function(notifierObject, options, event) {
     console.log('clicked');
     await open(url);
   });
 })*/


})();