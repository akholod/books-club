'use strict';

module.exports = function (UserProfileHandler) {
    UserProfileHandler.getOutcomingRequests().then((response) => {
        this.outcomingRequests = response;
    });

    UserProfileHandler.getUserBooks().then((response) => {
        this.userBooks = response;
    });

    this.userData = {
        'email': sessionStorage.getItem('userEmail'),
        'name':sessionStorage.getItem('userName'),
        'city':sessionStorage.getItem('userCity'),
    }
};