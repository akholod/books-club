'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Signup controller', function () {
        var UserHandler,
            LoginCtrl,
            $state,
            $scope,
            $controller,
            $q;

        beforeEach(inject(function (_UserHandler_, _$controller_, _$q_, _$state_, $rootScope) {
            UserHandler = _UserHandler_;
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $state = _$state_;
            $q = _$q_;
            LoginCtrl = $controller('LoginCtrl', {$state: $state, $scope: $scope, UserHandler: UserHandler});

            spyOn(UserHandler, 'loginUser').and.returnValue($q.when());
        }));

        it('should be Signup defined', function () {
            expect(LoginCtrl).toBeDefined();
        });
        it('should be call UserValidation service', function () {
            LoginCtrl.login();
            expect(UserHandler.loginUser).toHaveBeenCalled();
        });
    });
});