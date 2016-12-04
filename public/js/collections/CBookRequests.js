/**
 * Created by andrey on 04.12.16.
 */
'use strict';
var BookRequests = Backbone.Collection.extend({
    model: Book,
    url: 'api/userbooks/wishlist'
});