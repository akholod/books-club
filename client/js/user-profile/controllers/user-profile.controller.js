'use strict';

module.exports = function (UserProfileHandler, BooksActions) {

    UserProfileHandler.getOutcomingRequests().then((response) => {
        this.outcomingRequests = response;
    });

    UserProfileHandler.getUserBooks().then((response) => {
        this.userBooks = response;
    });

    this.removeBook = function (book, index) {
        BooksActions.removeBook(book.bookId);
        this.userBooks.splice(index, 1);
    };

    this.removeUserRequest = function (book, index) {
        BooksActions.removeRequest(book.bookId);
        this.outcomingRequests.splice(index, 1);
    };

    this.acceptRequest = function (book, index) {
        BooksActions.acceptRequest(book);
        this.userBooks.splice(index, 1);
    };

    this.disallowRequest = function (book) {
        BooksActions.removeRequest(book.bookId);
        book.requestUser = null;
    };

    this.userData = {
        'email': sessionStorage.getItem('userEmail'),
        'name':sessionStorage.getItem('userName'),
        'city':sessionStorage.getItem('userCity'),
    }
};