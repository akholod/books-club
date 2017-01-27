'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Signup controller', function () {
        var UserHandler,
            UserFormsValidator,
            SignupCtrl,
            $state,
            $scope,
            $controller,
            $q;

        beforeEach(inject(function (_UserHandler_,_UserFormsValidator_ ,_$controller_, _$q_, _$state_, $rootScope) {
            UserHandler = _UserHandler_;
            UserFormsValidator = _UserFormsValidator_;
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $state = _$state_;
            $q = _$q_;
            SignupCtrl = $controller('SignupCtrl', {$state: $state, $scope: $scope, UserHandler: UserHandler, UserFormsValidator: UserFormsValidator});

            spyOn(UserFormsValidator, 'isEmailValid').and.returnValue();
            spyOn(UserFormsValidator, 'isPasswordValid').and.returnValue();
            spyOn(UserFormsValidator, 'isUsernameValid').and.returnValue();
            spyOn(UserHandler, 'signupUser').and.returnValue($q.when());
        }));

        it('should be Signup defined', function () {
            expect(SignupCtrl).toBeDefined();
        });
        it('should be call UserValidation service', function () {
            SignupCtrl.signupData = {
                email: 'email@gmail.com',
                password: 'password1234',
                name: 'aaa'
            };
            SignupCtrl.signup();
            expect(UserFormsValidator.isEmailValid).toHaveBeenCalled();
            expect(UserFormsValidator.isPasswordValid).toHaveBeenCalled();
            expect(UserFormsValidator.isUsernameValid).toHaveBeenCalled();
        });

        it('should be call UserHandler service', function () {
            SignupCtrl.signupData = {
                email: 'email@gmail.com',
                password: 'password1234',
                confirmPassword: 'password1234',
                name: 'aaa'
            };
            SignupCtrl.signup();
            expect(UserHandler.signupUser).toHaveBeenCalled();
        });
    });
});