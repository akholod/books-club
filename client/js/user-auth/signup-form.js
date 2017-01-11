'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/signup-form.html'),
        controller: 'SignupCtrl',
        controllerAs: 'signupCtrl',
    };
};