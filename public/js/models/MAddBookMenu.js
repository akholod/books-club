'use strict';

let AddBookMenu = Backbone.Model.extend({
    defaults: {
        books: [],
        search: '',
        lang: 'ru'
    },
    initialize: function () {

    },
    searchBooks: function () {
        $.ajax({
            url: "/api/books/search",
            type: "POST",
            data: ({
                "bookTitle" : this.search,
                "bookLang" : this.lang
            }),
            success: (data) => {
                this.books = data;
            }
        })
    }
});
