angular.module('lazHack7')
  .factory('Games', function($http){
    //var gamesRef = firebase.database().ref('games');

    function getLiChessGames(username){
        var url = "https://us-central1-lazhack7-3b615.cloudfunctions.net/games?username=" + username;
        return $http.get(url)
            .then(function(result){
                var gameStrings = result.data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n");
                var games = [];
                gameStrings.forEach(function(str) {
                    try {
                        games.push(JSON.parse(str));
                    } catch(e){

                    }
                });
                return games;
            });
    }

    return {
      getGames: getLiChessGames

    };
  });
