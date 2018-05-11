angular.module('lazHack7')
  .controller('GamesCtrl', function(games, $mdToast){
    var gamesCtrl = this;
      gamesCtrl.games = games;

  });
