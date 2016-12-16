'use strict';

const app = angular.module('myApp', ['ngAnimate']);

app.service('BooksCatalog', ['$http', function($http){
    this.getBooks = function() {
        return $http({
            method: 'GET',
            url: '/api/books/'
        })
        .then((response) => {
            return response;
        }, (dataError) => {
            new Error((dataError));
        })
    }
}]);

app.controller('BooksCtrl',['BooksCatalog', function(BooksCatalog) {

    BooksCatalog.getBooks().then((response) => {
        this.books = response.data;
        console.log(this.books);
    });


}]);

app.directive('mainBooksCatalog', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/main-books-catalog.html',
        controller: 'BooksCtrl',
        controllerAs: 'booksCtrl',
    };
});


