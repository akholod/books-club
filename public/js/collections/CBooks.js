'use strict';

var Books = Backbone.Collection.extend({
    model: Book,
    url: 'api/books'
});
