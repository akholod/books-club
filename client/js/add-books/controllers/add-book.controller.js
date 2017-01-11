'use strict';

module.exports = function(BookSearch, BooksActions) {
    this.bookSearchLang = false;

    this.searchBook = function () {
        if (this.bookSearchField.length > 2) {
            BookSearch.findBooks(this.bookSearchField, this.bookSearchLang).then((response) => {
                console.log(response.data);
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
