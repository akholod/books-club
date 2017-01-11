'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./templates/book-card.html'),
        controller: 'BookDescriptionCtrl',
        controllerAs: 'bookDescriptionCtrl',
    };
};
