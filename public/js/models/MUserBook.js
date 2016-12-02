'use strict';

let UserBook = Backbone.Model.extend({
    defaults: {
        image: 'http://placehold.it/100x180',
        title: 'No title',
        authors: [],
        owner: 'Unknown'
    },
    initialize: function () {
        console.log('Init');
    }
});
