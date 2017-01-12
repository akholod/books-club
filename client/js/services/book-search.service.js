'use strict';

module.exports = function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            let arr = [];
            response.data.forEach((item) => {
                item.thumbnail = item.thumbnail.replace("http:","https:");
                arr.push(item)
            });
            response.data = arr;
            console.log(arr);
            console.log(response);
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}