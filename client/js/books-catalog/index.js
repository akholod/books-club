'use strict';

module.exports =
    angular.module('booksCatalog', [])
        .directive('booksCatalog', require('./books-cataog'))
        .directive('bookCard', require('./book-card'))
        .controller('BooksCtrl', require('./controllers/books-catalog.controller'))
        .controller('Session', require('./controllers/book-description.controller'));


