'use strict';

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
                    loginButtonHref : '/#userProfile',
                    signupButton : 'Выход',
                    signupButtonHref : '/logout'
                });
            }
        })
    }
});