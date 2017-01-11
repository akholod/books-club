'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/login-form.html'),
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl',
    };
};