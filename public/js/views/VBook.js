'use strict';

var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'item grid-item',
    events: {
        'click .trade': 'tradeRequest',
        'click img' : 'showDescription'
    },
    template: _.template( $('#bookTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        if(this.model.get('requestUser') !== '') {
            this.$el.find('.trade').remove();
        }
        return this;
    },
    tradeRequest: function () {
        this.model.tradeRequest();
    },
    showDescription: function () {
        console.log(this.model);

        myRouter.navigate("/bookDescription/" + this.model.get('bookId'), {trigger: true})
    }
});