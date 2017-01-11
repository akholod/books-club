'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/books-catalog.html'),
        controller: 'BooksCtrl',
        controllerAs: 'booksCtrl',
    };
};