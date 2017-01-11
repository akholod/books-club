'use strict';

module.exports = function($http, Session, ModalWindow) {
    this.loginUser = function(loginData) {
        return $http.post('/login', {
            "email": loginData.email,
            "password": loginData.password,
        }).then((response) => {
            Session.create(response.data.userId, response.data.local.email, response.data.name, response.data.city);
            ModalWindow.openModalWindow('Hello ' + (response.data.name || response.data.local.email) +'!', 'Login success!');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };

    this.signupUser = function(signupData) {
        return $http.post('/signup', {
            "email": signupData.email,
            "password": signupData.password,
            "name": signupData.name,
            "city": signupData.city,
        }).then((response) => {
            Session.create(response.data.userId, response.data.local.email, response.data.name, response.data.local.city);
            ModalWindow.openModalWindow('Hello and welcome ' + (response.data.name || response.data.local.email) +'!', 'Sign Up success!');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };

    this.logoutUser = function () {
        return $http.get('/logout').then((response) => {
            Session.destroy();
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };
}