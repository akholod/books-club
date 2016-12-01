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
                "bookLang" : $('#bookLang').prop('checked')
            }),
            success: (data) => {
                this.books = data;
                new SearchBooksCatalogView(Books, data);
            }
        })
    }
});
