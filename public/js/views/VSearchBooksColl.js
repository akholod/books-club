/**
 * Created by andrey on 01.12.16.
 */
'use strict';
var SearchBooksCatalogView = Backbone.View.extend({
    el: '#userBooks',

    initialize: function(Collection, collectionData = {}) {
        this.collection = new Collection(collectionData);
        this.render();
        this.listenTo( this.collection, 'add', this.renderBook );
        //this.listenTo( this.collection, 'reset', this.render );
    },
// отображение библиотеки посредством вывода каждой книги из коллекции
    render: function() {
        this.$el.html('');
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },
// отображение книги с помощью создания представления BookView
// и добавления отображаемого элемента в элемент библиотеки
    renderBook: function( item ) {
        var bookView = new SearchBookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    },

});