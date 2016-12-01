'use strict';

var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'item grid-item',
    template: _.template( $('#bookTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});