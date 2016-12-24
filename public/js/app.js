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
        })
        .state('login', {
            url: '/login',
            template: '<login-form></login-form>'
        })
        .state('signup', {
            url: '/signup',
            template: '<signup-form></signup-form>'
        })
        .state('searchbook', {
            url: '/searchbook',
            template: '<add-books-form></add-books-form>'
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

app.service('BookSearch', ['$http', function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            console.log(response)
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}]);

app.service('addBookToUserBooks', ['Restangular', function(Restangular) {
    this.addBookToUserBooks = function(bookData) {
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

app.controller('AddBooksCtrl', ['BookSearch', function(BookSearch) {
    this.searchBook = function () {
        BookSearch.findBooks(this.bookSearchField, this.bookSearchLang).then((response) => {

        });
    };
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

app.directive('addBooksForm', function () {
   return {
       restrict: 'E',
       scope: {},
       templateUrl: 'templates/add-books-form.html',
       controller: 'AddBooksCtrl',
       controllerAs: 'addBooksCtrl',
   }
});

app.directive('signupForm', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/signup-form.html',
        controller: 'SignupCtrl',
        controllerAs: 'signupCtrl',
    };
});
app.directive('loginForm', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/login-form.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl',
    };
});