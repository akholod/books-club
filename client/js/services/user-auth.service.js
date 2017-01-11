'use strict';

module.exports = function ($q, $rootScope, $injector) {
    this.response = (data) => {
        $rootScope.user = {
            userId: sessionStorage.getItem('userId'),
            userEmail: sessionStorage.getItem('userEmail'),
        };
        return $q.resolve(data);
    };
    this.responseError = (rejection) => {
        if(rejection.status === 401 && rejection.data === "Unauthorized") {
            $injector.get('$state').go('login');
            $injector.get('ModalWindow').openModalWindow('Wrong login or password!');
        }
        return $q.reject(rejection);
    };

}