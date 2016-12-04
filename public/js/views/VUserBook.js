'use strict';

var UserBookView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-books grid-item',
    events: {
        'click .remove' : 'removeRequest'
    },
    template: _.template( $('#userBooksTemp').html() ),
    initialize : function () {
        this.model.on('change', this.render, this);
        this.render();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },
    removeRequest: function () {
        this.model.removeRequest();
        this.remove();
    }
});