'use strict';
$('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});

let User = Backbone.Model.extend({
    defaults: {
        name: 'Unknown',
        email: '',
        city: ''
    },
    initialize: function () {
        this.getUser();
        console.log('Init User');
    },
    getUser: function () {
        $.ajax({
            url: "/api/user",
            type: "GET",
            success: (data) => {
                if(!data.local){
                    return
                }
                this.set({
                    email: data.local.email,
                    name: data.name,
                    city: data.city,
                    wishList: data.wishList,
                });
                if(window.location.hash === '#login') {
                    myRouter.navigate('userProfile', {trigger: true});
                }

            }
        })
    }
});

let UserProfileView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#userProfile').html() ),
    render: function() {
        this.$el.html(this.template( this.model.toJSON() ));
        return this;
    }
});


let Login = Backbone.Model.extend({

});
let LoginView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#loginPage').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});


let Signup = Backbone.Model.extend({

});
let SignupView = Backbone.View.extend({
    tagName: 'div',
    className: '',
    el: '#template',
    template: _.template( $('#signupPage').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});


let UserMenu = Backbone.Model.extend({
    defaults: {
        loginButton: 'Войти',
        loginButtonHref: '/#login',
        signupButton: 'Регистрация',
        signupButtonHref: '/#signup',
    },
    initialize: function () {
        this.getUser();
        console.log('Init user menu');
    },
    getUser: function () {
        $.ajax({
            url: "/api/user",
            type: "GET",
            success: (data) => {
                if(!data.local){
                    return
                }
                this.set({
                    loginButton : data.local.email,
                    loginButtonHref : '/#',
                    signupButton : 'Выход',
                    signupButtonHref : '/logout'
                });
            }
        })
    }
});
let UserMenuView = Backbone.View.extend({
    tagName: 'li',
    el: '#userMenu',
    template: _.template( $('#userMenuTemplate').html() ),
    initialize : function () {
        this.model.on('change', this.render, this);
        console.log(this.model);
        this.render();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});
let userMenu = new UserMenu();
let userMenuView = new UserMenuView({model: userMenu});
userMenuView.render();


let Book = Backbone.Model.extend({
    defaults: {
        image: 'http://placehold.it/100x180',
        title: 'No title',
        authors: [],
        owner: 'Unknown'
    },
    initialize: function () {
        console.log('Init');
        this.on('change:name',  () => {
            console.log('Name ' + this.get('name'))
        })
    },
    searchBook: function () {

        $.ajax({
            url: "/api/books/search",
            type: "POST",
            data: ({"bookTitle" : "Norwegian wood"}),
            success: (data) => {

            }
        });

    }
});

var Books = Backbone.Collection.extend({
    model: Book,
    url: 'api/books'
});

var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'item grid-item',
    template: _.template( $('#bookTemplate').html() ),
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    }
});

var BooksCatalogView = Backbone.View.extend({
    el: '#template',
    initialize: function() {
        this.collection = new Books();
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

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'login' : 'showLogin',
        'signup' : 'showSignup',
        'userProfile' : 'showUser'
    },
    home: function () {
        $('#template').html('');
        new BooksCatalogView();
        
    },
    showLogin: function () {
        $('#template').html('');
        loginView.render();
    },
    showSignup: function () {
        $('#template').html('');
        signupView.render();
    },
    showUser: function () {
        $('#template').html('');
        if (!currentUser.get('email')) {
            return myRouter.navigate('login', {trigger: true});
        }
        console.log(currentUser.get('email'));
        userProfileView.render();
    }

});
let login = new Login();
let loginView = new LoginView({model: login});

let signup = new Signup();
let signupView = new SignupView({model: signup});

let currentUser = new User();
let userProfileView  = new UserProfileView({model : currentUser});



var myRouter = new Router();
Backbone.history.start();

$(function() {


});
