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
        this.model.addToUserBooks();
    }
});