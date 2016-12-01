'use strict';

let UserProfileView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#userProfile').html() ),
    render: function() {
        this.$el.html(this.template( this.model.toJSON() ));
        return this;
    }
});

