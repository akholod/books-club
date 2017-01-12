'use strict';

module.exports = function(BookSearch, BooksActions) {
    this.bookSearchLang = false;

    this.searchBook = function () {
        if (this.bookSearchField.length > 2) {
            BookSearch.findBooks(this.bookSearchField, this.bookSearchLang).then((response) => {
                let arr = [];
                if (response.data.length > 3) {
                    response.data.forEach((item) => {
                        item.thumbnail = item.thumbnail.replace("http:","https:");
                        arr.push(item)
                    });
                    response.data = arr;
                }
                console.log(arr);
                console.log(response);
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
