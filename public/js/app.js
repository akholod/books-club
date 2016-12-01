'use strict';
$('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});


let userMenu = new UserMenu();
let userMenuView = new UserMenuView({model: userMenu});
userMenuView.render();

let login = new Login();
let loginView = new LoginView({model: login});

let signup = new Signup();
let signupView = new SignupView({model: signup});

let addBookMenu = new AddBookMenu();
let addBookMenuView = new AddBookMenuView({model: addBookMenu});

let currentUser = new User();
let userProfileView  = new UserProfileView({model : currentUser});


//Init router
var myRouter = new Router();
Backbone.history.start();

$(function() {


});
