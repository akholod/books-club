'use strict';

let UserMenuView = Backbone.View.extend({
    tagName: 'li',
    el: '#userMenu',
    template: _.template( $('#userMenuTemplate').html() ),
    initialize : function () {
        this.model.on('change', this.render, this);
        console.log(this.model);
        this.render();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});