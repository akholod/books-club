'use strict';

const userAuth = require('./user-auth');
const booksCatalog = require('./books-catalog');
const addBooks = require('./add-books');
const userProfile = require('./user-profile');



const app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'booksCatalog', 'addBooks', 'userProfile', 'userAuth']);


app.config(function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {

    $stateProvider
        .state('books', {
        url: '/books',
        template: '<books-catalog></books-catalog>'
        })
        .state('book', {
            url: '/books/:bookId',
            template: '<book-card></book-card>'
        })
        .state('login', {
            url: '/login',
            template: '<login-form></login-form>'
        })
        .state('signup', {
            url: '/signup',
            template: '<signup-form></signup-form>'
        })
        .state('searchbook', {
            url: '/searchbook',
            template: '<add-books-form></add-books-form>',

            resolve: { authenticate: authenticate },
        })
        .state('userprofile', {
        url: '/userprofile',
        template: '<user-profile></user-profile>',
        resolve: { authenticate: authenticate },
    });

    function authenticate($q, $state, $timeout, ModalWindow) {
        if (sessionStorage.getItem('userEmail')) {
            return $q.when()
        } else {
            $timeout(function () {
                ModalWindow.openModalWindow('You are not authorized on this page. Please Log In!');
                $state.go('login');
            });
        }
    }

    $httpProvider.interceptors.push('AuthUser');

    $urlRouterProvider.otherwise('/books');

    RestangularProvider.setBaseUrl("http://localhost:3000/api");
});

app.run(function ($rootScope) {
    console.log('huy user ' + sessionStorage.getItem('userEmail'))
    $rootScope.user = {
        userId: sessionStorage.getItem('userId'),
        userEmail: sessionStorage.getItem('userEmail'),
    };
});

app.service('ModalWindow', ['$uibModal', '$log', function ($uibModal, $log) {
    this.openModalWindow = function (bodyMessage, headMessage = 'Warning!') {
        var modalData = {
            bodyMessage: bodyMessage,
            headMessage: headMessage,
        };
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal-template.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            resolve: {
                items: function () {
                    return modalData;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.headMessage = items.headMessage;
    $ctrl.bodyMessage = items.bodyMessage;
    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

module.exports = app;
