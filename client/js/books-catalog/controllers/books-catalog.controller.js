'use strict';

module.exports =  function($rootScope, BooksCatalog, BooksActions) {

    this.createTradeRequest = function (bookId) {
        console.log(bookId);
        BooksActions.createTradeRequest(bookId);
    };

    BooksCatalog.getBooks().then((response) => {
        this.books = response;
        console.log(this.books[7]);
    });

    this.isRequestAvailiable = function (book) {
        return (!book.requestUser && (book.owner != $rootScope.user.userId));
    }
};