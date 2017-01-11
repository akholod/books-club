'use strict';

module.exports = function($state, $rootScope, $scope, UserHandler) {

    $scope.userSession = $rootScope.user;

    this.logoutCurrentUser = function () {
        UserHandler.logoutUser().then((response) => {
            $scope.user = {};
            $scope.user.userEmail = '';
            $scope.user.userId = '';
            $scope.userSession.userEmail = '';
            $scope.userSession.userId = '';
            $state.go("books");
        });
    }
}