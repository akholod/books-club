'use strict';

module.exports = function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            console.log(response);
            response.data.forEach(function (item) {
                item.thumbnail.replace(/http:/, "https:");
            });
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}