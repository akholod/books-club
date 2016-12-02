'use strict';

var UserBookView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-books grid-item',
    events: {
        'click .remove' : 'removeUserBooks'
    },
    template: _.template( $('#userBooksTemp').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },
    removeUserBooks: function () {
        $.ajax({
            url: "/api/books/" + this.model.get('bookId'),
            type: "DELETE",
            success: (data) => {
                alert(data.message);
                this.model.destroy();
                this.remove()
            }
        })
    }
});