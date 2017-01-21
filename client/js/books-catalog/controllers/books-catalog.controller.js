'use strict';

module.exports =  function($rootScope, BooksCatalog, BooksActions) {

    this.createTradeRequest = function (bookId) {
        BooksActions.createTradeRequest(bookId);
    };

    BooksCatalog.getBooks().then((response) => {
        this.books = response;
    });

    this.isRequestAvailiable = function (book) {
        return (!book.requestUser && (book.owner != $rootScope.user.userId));
    }
};