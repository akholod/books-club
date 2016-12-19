'use strict';

const app = angular.module('myApp', ['restangular', 'ui.router', 'ngAnimate']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider ) {
    $stateProvider
        .state('books', {
        url: '/books',
        template: '<main-books-catalog></main-books-catalog>'
        })
        .state('book', {
            url: '/books/:bookId',
            template: '<book-card></book-card>'
        });
    $urlRouterProvider.otherwise('/books');
});


app.service('BooksCatalog', ['$http', function($http) {
    this.getBooks = function() {
        return $http({
            method: 'GET',
            url: '/api/books/',
        })
        .then((response) => {
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };

    this.getBook = function(bookId) {
        return $http({
            method: 'GET',
            url: '/api/books/' + bookId,
        })
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}]);

app.controller('BooksCtrl', ['BooksCatalog', function(BooksCatalog) {
    BooksCatalog.getBooks().then((response) => {
        this.books = response.data;
        console.log(this.books);
    });
}]);

app.controller('BookDescriptionCtrl', ['BooksCatalog', '$stateParams', function(BooksCatalog, $stateParams) {
    BooksCatalog.getBook($stateParams.bookId).then((response) => {
        this.book = response.data;
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


app.directive('bookCard', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/book-card.html',
        controller: 'BookDescriptionCtrl',
        controllerAs: 'bookDescriptionCtrl',
    };
});
