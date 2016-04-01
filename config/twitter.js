"use strict";

var Twitter = require("twitter");
var Firebase = require("firebase");

var ref = new Firebase("https://burning-torch-9292.firebaseio.com/");
var tweetRef = ref.child("tweets");

//create new user
// ref.createUser({
//   email: "test@test.test",
//   password: "123"
// }, function(err, userData) {
//   console.log('ERR', err);
//   console.log('USERDATA', userData);
//
// })

//stuff for twitter
// var client = new Twitter({
//
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });
//
//
// client.stream('statuses/filter', {track: 'puppy'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.user.screen_name, tweet.text);
//     var tweetObj = {
//       screen_name: tweet.user.screen_name,
//       text: tweet.text
//     };
//
//     tweetRef.push(tweetObj);
//     //push the tweet up to firebase
//
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });
