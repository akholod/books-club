'use strict';

module.exports = function($state, $rootScope, $scope, UserHandler, currentUserFact) {

    $scope.user = currentUserFact;
    $scope.userSession = $rootScope.user;

    this.logoutCurrentUser = function () {
        UserHandler.logoutUser().then((response) => {
            $scope.user.userEmail = '';
            $scope.user.userId = '';
            $scope.userSession.userEmail = '';
            $scope.userSession.userId = '';
            $state.go("books");
        });
    }
}