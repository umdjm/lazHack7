angular.module('lazHack5')
  .controller('PlayersCtrl', function(scoring, players, $mdToast, Players){
    var playersCtrl = this;
    playersCtrl.players = players;
    playersCtrl.scoring = scoring;
    playersCtrl.taken = localStorage.getItem('taken') === "true";
    playersCtrl.positionFilters = {
      QB: localStorage.getItem('QB') === "true",
      RB: localStorage.getItem('RB') === "true",
      WR: localStorage.getItem('WR') === "true",
      TE: localStorage.getItem('TE') === "true"
    };
    Players.cleanupData(players, scoring);
    Players.computeBids(players);

    playersCtrl.saveFilters = function() {
      localStorage.setItem('QB', playersCtrl.positionFilters.QB);
      localStorage.setItem('RB', playersCtrl.positionFilters.RB);
      localStorage.setItem('WR', playersCtrl.positionFilters.WR);
      localStorage.setItem('TE', playersCtrl.positionFilters.TE);
      localStorage.setItem('taken', playersCtrl.taken);
    };

    playersCtrl.save = function(player) {
      Players.computeBids(players);
      players.$save(player).then(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Saved")
            .hideDelay(3000)
        );
      });
    };

    playersCtrl.positionFilter = function () {
      return function (player) {
        if ( player.actual > 0 && !playersCtrl.taken) {
          return false;
        }
        if ( playersCtrl.positionFilters[player.Position] === false ) {
          return false;
        }
        return true;
      }
    };

  });
