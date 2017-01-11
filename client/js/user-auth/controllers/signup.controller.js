'use strict';


module.exports = function($state, $scope, UserHandler, UserFormsValidator) {

    this.closeAlert = function () {
        this.signupFailureMessage = '';
    };
    this.signup = function () {
        let isInvalid = UserFormsValidator.isEmailValid(this.signupData.email);
        if(isInvalid) {
            return this.signupFailureMessage = isInvalid;
        }
        isInvalid = UserFormsValidator.isPasswordValid(this.signupData.password);
        if(isInvalid) {
            return this.signupFailureMessage = isInvalid;
        }
        isInvalid = UserFormsValidator.isUsernameValid(this.signupData.name);
        if(isInvalid) {
            return this.signupFailureMessage = isInvalid;
        }
        isInvalid = UserFormsValidator.isPasswordConfirm(this.signupData.password, this.signupData.confirmPassword);
        if(isInvalid) {
            return this.signupFailureMessage = isInvalid;
        }

        UserHandler.signupUser(this.signupData).then((response) => {
            $scope.user = {};
            $scope.user.userEmail = response.data.local.email;
            $scope.user.userId = response.data.userId;
            $state.go("books");
            this.signupFailureMessage = '';

        });
    }
};

