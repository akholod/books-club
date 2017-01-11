'use strict';

module.exports = function($state, $scope, UserHandler, currentUserFact) {
    $scope.user = currentUserFact;

    this.login = function () {
        UserHandler.loginUser(this.loginData).then((response) => {
            if(response.data.userId) {
                $scope.user.userEmail = response.data.local.email;
                $scope.user.userId = response.data.userId;
                $state.go("books");
            }
        });
    };
};