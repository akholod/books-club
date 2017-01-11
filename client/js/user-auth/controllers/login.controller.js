'use strict';

module.exports = function($state, $scope, UserHandler) {

    this.login = function () {
        UserHandler.loginUser(this.loginData).then((response) => {
            if(response.data.userId) {
                $scope.user = {};
                $scope.user.userEmail = response.data.local.email;
                $scope.user.userId = response.data.userId;
                $state.go("books");
            }
        });
    };
};