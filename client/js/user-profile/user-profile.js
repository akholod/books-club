'use strict';

module.exports = function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/user-profile.html'),
        controller: 'UserProfileCtrl',
        controllerAs: 'userProfileCtrl',
    }
};


