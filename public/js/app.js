'use strict';

const app = angular.module('myApp', ['restangular', 'ui.router', 'ngAnimate']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
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

    RestangularProvider.setBaseUrl("http://localhost:3000/api");
});


app.service('BooksCatalog', ['Restangular', function(Restangular) {
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
}]);

app.service('BooksActions', ['Restangular', function(Restangular) {
    this.createTradeRequest = function(bookId) {
        return Restangular.one('books', bookId).put()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}]);

app.controller('BooksCtrl', ['BooksCatalog', 'BooksActions', function(BooksCatalog, BooksActions) {
    BooksCatalog.getBooks().then((response) => {
        this.books = response;
    });



}]);

app.controller('BookDescriptionCtrl', ['BooksCatalog', '$stateParams', function(BooksCatalog, $stateParams) {
    BooksCatalog.getBook($stateParams.bookId).then((response) => {
        this.book = response;
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
