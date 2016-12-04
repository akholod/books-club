'use strict';

var UserBooks = Backbone.Collection.extend({
    model: Book,
    url: 'api/userbooks'
});