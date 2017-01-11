'use strict';

module.exports =
    angular.module('userAuth', [])
        .directive('signupForm', require('./signup-form'))
        .directive('loginForm', require('./login-form'))
        .directive('currentUser', require('./current-user'))
        .controller('LoginCtrl', require('./controllers/login.controller'))
        .controller('SignupCtrl', require('./controllers/signup.controller'))
        .controller('CurrentUserCtrl', require('./controllers/current-user.controller'));

