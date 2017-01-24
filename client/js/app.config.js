'use strict';

module.exports =
    angular.module('app')

        .config(function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {

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

            RestangularProvider.setBaseUrl("http://books-ex.herokuapp.com//api");
        })

        .run(function ($rootScope) {
            $rootScope.user = {
                userId: sessionStorage.getItem('userId'),
                userEmail: sessionStorage.getItem('userEmail'),
            };
        });