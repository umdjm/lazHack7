angular.module('lazHack5')
  .factory('Players', function($firebaseArray){
    var playersRef = firebase.database().ref('players');
    var scoringRef = firebase.database().ref('scoring');

    function findReplacementPlayers(players){
      var replacementPlayers = {};
      replacementPlayers.QB = findReplacementPlayer(players, "QB");
      replacementPlayers.RB = findReplacementPlayer(players, "RB");
      replacementPlayers.WR = findReplacementPlayer(players, "WR");
      replacementPlayers.TE = findReplacementPlayer(players, "TE");
      return replacementPlayers;
    }
    function findReplacementPlayer(players, position){
      var rank = starters[position];
      var result = players.filter(function(player){
        return player.Position == position;
      }).sort(function(p1, p2){
        return p2.Projected - p1.Projected;
      });

      var replacementPlayer = (rank < result.length) ? result[rank] : result[length-1];
      return replacementPlayer;
    }

    var starters = {
      "QB" : 12,
      "RB" : 24,
      "WR" : 24,
      "TE" : 12
    };
    function computeVORP(player, replacementPlayer){
      return Math.max(0, player.Projected - replacementPlayer.Projected);
    }

    function computeBids(players){
      var totalVorp = 0;
      var totalBidPool = 1200;
      var bidsSoFar = 0;
      var replacementPlayers = findReplacementPlayers(players);
      players.forEach(function(player){

        if(player.actual) {
          bidsSoFar += player.actual;
        } else {
          player.Vorp = computeVORP(player, replacementPlayers[player.Position]);
          totalVorp += player.Vorp;
        }
      });
      var remainingBidPool = totalBidPool - bidsSoFar;
      players.forEach(function(player){
        player.Suggested_Bid = (player.Vorp / totalVorp) * remainingBidPool;
      });

    }

    function cleanupData(players, scoring){

      players.forEach(function(player){
        var changed= false;
        if(isNaN(player["Pass_Yards"])) {
          player["Pass_Yards"] = parseFloat(player["Pass_Yards"].replace(/,/g, ''));
          changed = true;
        }
        if(isNaN(player["Rush_Yards"])) {
          player["Rush_Yards"] = parseFloat(player["Rush_Yards"].replace(/,/g, ''));
          changed = true;
        }
        if(isNaN(player["Rec_Yards"])) {
          player["Rec_Yards"] = parseFloat(player["Rec_Yards"].replace(/,/g, ''));
          changed = true;
        }

        var proj = getProjectedPoints(player, scoring);
        if(proj != player["Projected"]){
          player["Projected"] = proj;
          changed = true;
        }

        if(changed) players.$save(player);
      });
    }

    function getProjectedPoints(player, scoring){
      var score = scoring.reduce(function (sum, value) {
        var key = value.$id;
        if(isNaN(player[key])) return sum;
        return sum + player[key] * value.$value;
      }, 0);

      return score;
    };

    return {
      players: $firebaseArray(playersRef),
      scoring: $firebaseArray(scoringRef),
      cleanupData: cleanupData,
      computeBids: computeBids
    };
  });
