'use strict';

module.exports =
    angular.module('booksCatalog', [])
        .directive('booksCatalog', require('./books-cataog'))
        .directive('bookCard', require('./book-card'))
        .controller('BooksCtrl', require('./controllers/books-catalog.controller'))
        .controller('BookDescriptionCtrl', require('./controllers/book-description.controller'));


