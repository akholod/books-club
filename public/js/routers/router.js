/**
 * Created by andrey on 01.12.16.
 */
'use strict';

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'login' : 'showLogin',
        'signup' : 'showSignup',
        'userProfile' : 'showUser',
        'userBooks' : 'showUserBooks',
        'bookDescription/:bookId': 'bookDescription'
    },
    home: function () {
        $('#template').html('');
        new BooksCatalogView(Books);
    },
    showLogin: function () {
        $('#template').html('');
        loginView.render();
    },
    showSignup: function () {
        $('#template').html('');
        signupView.render();
    },
    showUserBooks: function () {
        $('#template').html('');
        if (!currentUser.get('email')) {
            return myRouter.navigate('login', {trigger: true});
        }
        addBookMenuView.render();
    },
    showUser: function () {
        $('#template').html('');
        if (!currentUser.get('email')) {
            return myRouter.navigate('login', {trigger: true});
        }
        userProfileView.render();
        new UserBooksView(UserBooks);
        new BookRequestsView(BookRequests);
    },
    bookDescription: function (bookId) {
        $('#template').html('');
        let descrBook = new Book();
        descrBook.getBookDescription(bookId);
        var bookDescription = new BookDescription({model: descrBook});
        bookDescription.render();
    }

});