angular.module('lazHack5')
  .controller('ScoringCtrl', function(scoring, $mdToast){
    var scoringCtrl = this;
    scoringCtrl.scoring = scoring;

    scoringCtrl.save = function(setting){
      scoringCtrl.scoring.$save(setting).then(function(){

        $mdToast.show(
          $mdToast.simple()
            .textContent('Saved')
            .hideDelay(3000)
        );

      });
    };
  });
