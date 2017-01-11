'use strict';

module.exports = function (UserProfileHandler) {
    UserProfileHandler.getOutcomingRequests().then((response) => {
        this.outcomingRequests = response;
        console.log(this.outcomingRequests)
    });

    UserProfileHandler.getUserBooks().then((response) => {
        this.userBooks = response;
        console.log(this.userBooks)
    });

    this.userData = {
        'email': sessionStorage.getItem('userEmail'),
        'name':sessionStorage.getItem('userName'),
        'city':sessionStorage.getItem('userCity'),
    }
};