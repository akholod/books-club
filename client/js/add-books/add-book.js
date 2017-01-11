'use strict';


module.exports = function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/add-book.html'),
        controller: 'AddBooksCtrl',
        controllerAs: 'addBooksCtrl',
    }
};
