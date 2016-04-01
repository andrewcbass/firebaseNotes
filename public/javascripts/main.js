"use strict";

// var ref = new Firebase("https://burning-torch-9292.firebaseio.com/");

var app = angular.module("fireApp", ["firebase"]);

app.constant("FB_URL", "https://burning-torch-9292.firebaseio.com/");

app.controller("mainCtrl", function($scope, $tweets, $authObj, ProfileFactory) {
  $scope.tweets = $tweets;
  $scope.authObj = $authObj;

  $scope.authObj.$onAuth(function(authData) {
    console.log('AUTHDATA', authData);
    $scope.authData = authData;
    $scope.profile = ProfileFactory(authData.uid);
  })

  $scope.logout = function() {
    $scope.authObj.$unauth();
  }
  $scope.register = function(user) {
    $scope.authObj.$createUser(user)
    .then(function(authData) {
      console.log('User logged in', authData);

      $scope.authObj.$authWithPassword(user);
    })
    .catch(function(err) {
      console.log('ERR', err);
    });
  };

  $scope.login = function(user) {
    $scope.authObj.$authWithPassword(user)
    .then(function(authData) {
      console.log('User logged in', authData);
    })
    .catch(function(err) {
      console.log('ERR', err);
    });
  };
});

app.factory("ProfileFactory", function($firebaseObject, FB_URL) {
  return function(uid) {
    var profilesRef = new Firebase(FB_URL + "profiles");
    //find individual user by the user id (uid)
    var userRef = profilesRef.child(uid);
    return $firebaseObject(userRef);
  };
});

//custom filter!!!
app.filter("reverse", function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.factory("$tweets", function($firebaseArray, FB_URL) {
  var ref = new Firebase(FB_URL);
  var tweetsRef = ref.child("tweets");
  return $firebaseArray(tweetsRef);
})

app.factory("$authObj", function($firebaseAuth, FB_URL) {
  var ref = new Firebase(FB_URL);
  return $firebaseAuth(ref);
});

//////////////////////////////////////
// for jQuery
// ref.child("tweets").on('child_added', function(snapshot) {
//   var tweetObj = snapshot.val();
//
//   var $tweet = $("#template").clone();
//   $tweet.removeAttr("id");
//   $tweet.find(".screename").text(tweetObj.screen_name);
//   $tweet.find(".text").text(tweetObj.text);
//
//   $("#tweets").prepend($tweet);
//
// });
