'use strict';

let AddBookMenuView = Backbone.View.extend({
    tagName: 'div',
    events:{
        'click #searchBtn': 'search'
    },
    className: '',
    el: '#template',
    template: _.template( $('#searchTemplate').html() ),
    initialize: function () {
        this.model.on('change', this.render, this);
        this.render();
    },
    search: function () {
        this.model.search = $('#searchField').val();
        this.model.searchBooks();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

    },
});
