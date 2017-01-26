'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('User form validation service', function () {

        var UserFormsValidator;

        beforeEach(inject(function (_UserFormsValidator_) {
            UserFormsValidator = _UserFormsValidator_;
        }));

        it('should return warning message if email is invalid', inject(function () {
            var res;
            res = UserFormsValidator.isEmailValid('aaa');
            expect(typeof res).toBe('string');
            expect(res.length).toBeGreaterThanOrEqual(1);

            res = UserFormsValidator.isEmailValid('aaa@gmail.com');
            expect(typeof res).toBe('undefined');
        }));

        it('should return warning message if password is invalid', inject(function () {
            var res;
            res = UserFormsValidator.isPasswordValid('123');
            expect(typeof res).toBe('string');
            expect(res.length).toBeGreaterThanOrEqual(1);

            res = UserFormsValidator.isPasswordValid('123456trampam');
            expect(typeof res).toBe('undefined');
        }));

        it('should return warning message if username is invalid', inject(function () {
            var res;
            res = UserFormsValidator.isUsernameValid('???');
            expect(typeof res).toBe('string');
            expect(res.length).toBeGreaterThanOrEqual(1);

            res = UserFormsValidator.isUsernameValid('Dima');
            expect(typeof res).toBe('undefined');
        }));

    });
});

