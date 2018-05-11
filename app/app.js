'use strict';
angular
  .module('lazHack5', [
    'firebase',
    'angular-md5',
    'ui.router',
    'ngMaterial'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          profile: function ($state, Auth, Users){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('channels.players', {
        url: '/players',
        templateUrl: 'players/players.html',
        controller: 'PlayersCtrl as playersCtrl',
        resolve: {
          scoring: function(Players){
            return Players.scoring.$loaded();
          },
          players: function(Players){
            return Players.players.$loaded();
          }
        }
      })
      .state('channels.editPlayer', {
        url: '/players/{playerId}',
        templateUrl: 'players/player.html',
        controller: 'PlayerCtrl as playerCtrl',
        resolve: {
          scoring: function(Players){
            return Players.scoring.$loaded();
          },
          players: function($stateParams, Players){
            return Players.players.$loaded();
          },
          player: function($stateParams, Players){
            return Players.players.$loaded().then(function(players){
              return players[$stateParams.playerId]
            });
          }
        }
      })
      .state('channels.scoring', {
        url: '/scoring',
        templateUrl: 'scoring/scoring.html',
        controller: 'ScoringCtrl as scoringCtrl',
        resolve: {
          scoring: function(Players){
            return Players.scoring.$loaded();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/')
  .config(function(){
    var config = {
      apiKey: "AIzaSyAhapE6LNS75JgfDNxze6Zpzi2z7yY64gk",
      authDomain: "lazhack5-1293e.firebaseapp.com",
      databaseURL: "https://lazhack5-1293e.firebaseio.com",
      projectId: "lazhack5-1293e",
      storageBucket: "lazhack5-1293e.appspot.com",
      messagingSenderId: "954306478427"
    };
    firebase.initializeApp(config);
  });
