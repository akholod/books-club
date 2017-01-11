'use strict';

module.exports =
    angular.module('userProfile', [])
        .directive('userProfile', require('./user-profile'))
        .controller('UserProfileCtrl', require('./controllers/user-profile.controller'));