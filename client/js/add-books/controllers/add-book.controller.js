'use strict';

module.exports = function(BookSearch, BooksActions) {
    this.bookSearchLang = false;

    this.searchBook = function (bookSearchField) {
        if (bookSearchField.length > 2) {
            BookSearch.findBooks(bookSearchField, this.bookSearchLang).then((response) => {
                this.foundBooks = response.data;
            });
        }
    };

    this.addToUserBooks = function(foundBook) {
        BooksActions.addToUsersBooks(foundBook).then((response) => {
            console.log(response);
        });
    }
};
