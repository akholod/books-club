'use strict';

let Book = Backbone.Model.extend({
    defaults: {
        image: 'http://placehold.it/100x180',
        title: 'No title',
        authors: [],
        owner: 'Unknown'
    },
    initialize: function () {
        console.log('Init');
    },
    tradeRequest: function () {
        $.ajax({
            url: "/api/books/" + this.get('bookId'),
            type: "PUT",
            success: (data) => {
                alert('Книга добавлена');
            }
        })
    },
    addToUserBooks : function () {
        alert(this.get('title'));
        $.ajax({
            url: "/api/books/",
            type: "POST",
            data: ({
                "title" : this.get('title'),
                "language" : this.get('language'),
                "image" : this.get('thumbnail'),
                "authors" : this.get('authors'),
                "pageCount" : this.get('pageCount'),
                "description" : this.get('description'),
                "owner" : currentUser.userId,
            }),
            success: (data) => {
                alert('Книга добавлена');
            }
        })
    },
    removeUserBooks: function () {
        $.ajax({
            url: "/api/books/" + this.get('bookId'),
            type: "DELETE",
            success: (data) => {
                alert(data.message);
                this.destroy();
            }
        })
    },
    removeRequest : function () {
        $.ajax({
            url: "/api//userbooks/wishlist/" + this.get('bookId'),
            type: "PUT",
            success: (data) => {
                alert('Запрос удален');
                this.destroy();
            }
        })
    }
});


