'use strict';

let LoginView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#loginPage').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});