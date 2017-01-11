'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        template: require('./templates/current-user.html'),
        controller: 'CurrentUserCtrl',
        controllerAs: 'currentUserCtrl',
    };
};