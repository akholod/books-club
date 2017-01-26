'use strict';

module.exports = function(Restangular) {
    this.test = 5;
    this.getBooks = function() {
        return Restangular.all('books').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };

    this.getBook = function(bookId) {
        return Restangular.one('books', bookId).get()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}