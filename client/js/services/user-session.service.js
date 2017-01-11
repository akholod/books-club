'use strict';

module.exports = function () {
    this.create = function (userId, userEmail, userName, userCity) {
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userEmail', userEmail);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userCity', userCity);
    };
    this.destroy = function () {
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('userEmail', '');
        sessionStorage.setItem('userName', '');
        sessionStorage.setItem('userCity', '');
        sessionStorage.setItem('userRole', '');
    };
}