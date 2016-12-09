'use strict';

var UserBookView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-books grid-item',
    events: {
        'click .remove' : 'removeUserBooks',
        'click .accept' : 'approveRequest'
    },
    template: _.template( $('#userBooksTemp').html() ),
    initialize : function () {
        this.model.on('change', this.render, this);
        this.render();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        if(this.model.get('requestUser') === '') {
            this.$el.find('.request').remove();
            console.log(this.model.get('requestUser'));
        }
        return this;
    },
    removeUserBooks: function () {
        this.model.removeUserBooks();
        this.remove();
    },
    approveRequest: function () {
        alert(`Запос одобрен!
        email для свзяи ${this.model.get('requestUser')}`);
        this.model.removeUserBooks();
        this.remove();
    }
});