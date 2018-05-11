angular.module('lazHack7')
  .factory('Games', function($http){
    //var gamesRef = firebase.database().ref('games');

    function getLiChessGames(username){
        var url = "http://localhost:9000/api/games/export/" + username;
        var config = {headers:  {
            'Authorization': 'Bearer sX0DkQk9aKvyCJjf',
            'Accept': 'application/json'
        }
        };
        return $http.get(url, config)
            .then(function(result){
                console.log(result);

            });
    }

    return {
      getGames: getLiChessGames

    };
  });
