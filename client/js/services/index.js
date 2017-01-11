'use strict';

module.exports =
    angular.module('app')
        .service('UserHandler', require('./user-handler.service'))

        .service('UserProfileHandler', require('./user-profile-handler.service'))

        .service('Session', require('./user-session.service.js'))

        .service('BooksCatalog', require('./books-catalog.service'))

        .service('BooksActions', require('./books-actions.service'))

        .service('UserFormsValidator', require('./user-forms-validator.service'))

        .service('BookSearch', require('./book-search.service'))

        .service('AuthUser', require('./user-auth.service'));




