/**
 * Created by andrey on 01.12.16.
 */
'use strict';

var SearchBookView = Backbone.View.extend({
    tagName: 'div',
    className: 'search-books grid-item',
    events: {
        'click' : 'addToUserBooks'
    },
    template: _.template( $('#searchBook').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },
    addToUserBooks : function () {
        alert(this.model.get('title'));
        $.ajax({
            url: "/api/books/",
            type: "POST",
            data: ({
                "title" : this.model.get('title'),
                "language" : this.model.get('language'),
                "image" : this.model.get('thumbnail'),
                "authors" : this.model.get('authors'),
                "pageCount" : this.model.get('pageCount'),
                "description" : this.model.get('description'),
                "owner" : currentUser.userId,
            }),
            success: (data) => {
                alert('Книга добавлена');
            }
        })
    }
});