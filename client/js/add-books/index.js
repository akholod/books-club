'use strict';

module.exports =
    angular.module('addBooks', [])
        .directive('addBooksForm', require('./add-book'))
        .controller('AddBooksCtrl', require('./controllers/add-book.controller'));


