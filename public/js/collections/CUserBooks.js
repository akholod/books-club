'use strict';

var UserBooks = Backbone.Collection.extend({
    model: UserBook,
    url: 'api/userbooks'
});