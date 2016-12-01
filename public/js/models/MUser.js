'use strict';

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