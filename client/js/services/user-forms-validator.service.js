'use strict';

module.exports = function() {
    this.isEmailValid = function(email) {
        let regexp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!regexp.test(email)) {
            return 'Invalid email';
        }
    };

    this.isPasswordValid = function(password) {
        let regexp = /^[a-z0-9_-]{6,18}$/;
        if (!regexp.test(password)) {
            return 'Invalid password';
        }
    };

    this.isUsernameValid = function(username) {
        let regexp = /^[a-zA-Z0-9_-]{3,16}$/;
        if (!regexp.test(username)) {
            return 'Invalid username';
        }
    };

    this.isPasswordConfirm = function (password, confirmPassword) {
        if (password !== confirmPassword) {
            return 'Invalid confirm password'
        }
    }
}