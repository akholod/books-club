'use strict';

let SignupView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#signupPage').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});