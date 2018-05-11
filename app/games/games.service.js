angular.module('lazHack7')
  .factory('Games', function($firebaseArray){
    var gamesRef = firebase.database().ref('games');

    return {
      games: $firebaseArray(gamesRef)
    };
  });
