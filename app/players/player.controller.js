angular.module('lazHack5')
  .controller('PlayerCtrl', function(scoring, players, player, $mdToast){
    var playerCtrl = this;
    playerCtrl.player = player;
    playerCtrl.scoring = scoring;

    playerCtrl.save = function() {
      player.Projected = getProjectedPoints(player);
      players.$save(player).then(function () {
        toast("Saved");
      });
    };

    function toast(message){
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(3000)
      );
    }

    function getProjectedPoints(player){
      var score = scoring.reduce(function (sum, value) {
        var key = value.$id;
        if(isNaN(player[key])) return sum;
        return sum + player[key] * value.$value;
      }, 0);

      return score;
    };

  });
