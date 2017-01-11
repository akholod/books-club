'use strict';

module.exports = function (Restangular) {
    this.getOutcomingRequests = function () {
        return Restangular.all('/userbooks/wishlist').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };

    this.getUserBooks = function () {
        return Restangular.all('/userbooks').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    }
}