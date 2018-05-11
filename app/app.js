'use strict';
angular
  .module('lazHack7', [
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
      .state('channels.games', {
        url: '/games',
        templateUrl: 'games/games.html',
        controller: 'GamesCtrl as gamesCtrl',
        resolve: {
          games: function(Games){
            return Games.games.$loaded();
          }
        }
      })
      .state('channels.editGame', {
        url: '/games/{gameId}',
        templateUrl: 'games/game.html',
        controller: 'GameCtrl as gameCtrl',
        resolve: {
          game: function($stateParams, Games){
            return Games.games.$loaded().then(function(games){
              return game[$stateParams.gameId]
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/')
  .config(function(){
    var config = {
        apiKey: "AIzaSyBi7Wd_TwCZaSisrcX6QnsVdHe5UbE4MuQ",
        authDomain: "lazhack7-3b615.firebaseapp.com",
        databaseURL: "https://lazhack7-3b615.firebaseio.com",
        projectId: "lazhack7-3b615",
        storageBucket: "lazhack7-3b615.appspot.com",
        messagingSenderId: "95900897913"
    };
    firebase.initializeApp(config);
  });
