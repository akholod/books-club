'use strict';

module.exports = function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            console.log(response);
            var arr = [];
            response.data.forEach(function (item) {
                item.thumbnail = item.thumbnail.replace("http:", "https:");
                arr.push(item);
            });
            response.data = arr;
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}