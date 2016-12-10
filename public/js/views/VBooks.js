'use strict';

var BooksCatalogView = Backbone.View.extend({
    el: '#template',
    initialize: function(Collection, collectionData) {
        this.collection = new Collection(collectionData);
        this.collection.fetch();
        this.render();
        this.listenTo( this.collection, 'add', this.renderBook );
        //this.listenTo( this.collection, 'reset', this.render );
    },
// отображение библиотеки посредством вывода каждой книги из коллекции
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },
// отображение книги с помощью создания представления BookView
// и добавления отображаемого элемента в элемент библиотеки
    renderBook: function( item ) {
        var bookView = new BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});