/**
 * Created by andrey on 09.12.16.
 */
'use strict';

var BookDescription = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#booksDescr').html() ),
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