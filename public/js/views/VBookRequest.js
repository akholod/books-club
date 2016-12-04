/**
 * Created by andrey on 04.12.16.
 */
'use strict';
var BookRequestView = Backbone.View.extend({
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