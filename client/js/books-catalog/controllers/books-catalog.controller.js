'use strict';

module.exports =  function(BooksCatalog) {
    BooksCatalog.getBooks().then((response) => {
        this.books = response;
    });
};