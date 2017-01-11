'use strict';

module.exports = function(BooksCatalog, $stateParams) {
    BooksCatalog.getBook($stateParams.bookId).then((response) => {
        this.book = response;
    });
};