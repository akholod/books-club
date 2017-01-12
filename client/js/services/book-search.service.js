'use strict';

module.exports = function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}