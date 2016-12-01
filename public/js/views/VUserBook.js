
'use strict';

var UserBookView = Backbone.View.extend({
    tagName: 'div',
    className: 'search-books grid-item',
    events: {
        'click' : 'addToUserBooks'
    },
    template: _.template( $('#searchBook').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});