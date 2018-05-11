angular.module('lazHack5')
  .controller('ChannelsCtrl', function($state, Auth, Users, profile){
    var channelsCtrl = this;
    Users.setOnline(profile.$id);
    channelsCtrl.profile = profile;
    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;

    channelsCtrl.logout = function(){
      channelsCtrl.profile.online = null;
      channelsCtrl.profile.$save().then(function(){
        Auth.$signOut().then(function(){
          $state.go('home');
        });
      });
    };

  });
