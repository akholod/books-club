'use strict';

const userAuth = require('./user-auth');
const booksCatalog = require('./books-catalog');

const app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'booksCatalog', 'addBooks', 'userProfile', 'userAuth']);


const addBooks = angular.module('addBooks', []);
const userProfile = angular.module('userProfile', []);


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


app.service('AuthUser', ['$q', '$rootScope', '$injector', function ($q, $rootScope, $injector) {
    this.response = (data) => {
        $rootScope.user = {
            userId: sessionStorage.getItem('userId'),
            userEmail: sessionStorage.getItem('userEmail'),
        };
        return $q.resolve(data);
    };
    this.responseError = (rejection) => {
        console.log(rejection)
        if(rejection.status === 401 && rejection.data === "Unauthorized") {
            $injector.get('$state').go('login');
            $injector.get('ModalWindow').openModalWindow('Wrong login or password!');
        }
        return $q.reject(rejection);
    };

}]);

app.service('BooksCatalog', ['Restangular', function(Restangular) {
    this.getBooks = function() {
        return Restangular.all('books').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };

   this.getBook = function(bookId) {
        return Restangular.one('books', bookId).get()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}]);

app.service('BooksActions', ['$state', 'Restangular', 'ModalWindow', function($state, Restangular, ModalWindow) {
    this.createTradeRequest = function(bookId) {
        return Restangular.one('books', bookId).put()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
    this.addToUsersBooks = function (book) {
        return Restangular.all('books').post({
            title: book.title,
            language: book.language,
            image: book.thumbnail,
            authors: book.authors,
            pageCount: book.pageCount,
            description: book.description,
        }).then((response) => {
            console.log(response);
            ModalWindow.openModalWindow(response.message, 'Success!');
            $state.go('books');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}]);

app.service('BookSearch', ['$http', function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}]);


app.service('UserFormsValidator', function() {
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
});

app.service('UserHandler', ['$http', 'Session', 'ModalWindow', function($http, Session, ModalWindow) {
    this.loginUser = function(loginData) {
        return $http.post('/login', {
            "email": loginData.email,
            "password": loginData.password,
        }).then((response) => {
            Session.create(response.data.userId, response.data.local.email, response.data.name, response.data.city);
            ModalWindow.openModalWindow('Hello ' + (response.data.name || response.data.local.email) +'!', 'Login success!');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };

    this.signupUser = function(signupData) {
        return $http.post('/signup', {
            "email": signupData.email,
            "password": signupData.password,
            "name": signupData.name,
            "city": signupData.city,
        }).then((response) => {
            Session.create(response.data.userId, response.data.local.email, response.data.name, response.data.local.city);
            ModalWindow.openModalWindow('Hello and welcome ' + (response.data.name || response.data.local.email) +'!', 'Sign Up success!');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };
    
    this.logoutUser = function () {
        return $http.get('/logout').then((response) => {
            Session.destroy();
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    };
}]);

app.service('Session', function () {
    this.create = function (userId, userEmail, userName, userCity) {
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userEmail', userEmail);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userCity', userCity);

    };
    this.destroy = function () {
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('userEmail', '');
        sessionStorage.setItem('userName', '');
        sessionStorage.setItem('userCity', '');
        sessionStorage.setItem('userRole', '');
    };
});

app.service('UserProfileHandler', ['Restangular', '$http',function (Restangular, $http) {
    this.getOutcomingRequests = function () {
        return Restangular.all('/userbooks/wishlist').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };

    this.getUserBooks = function () {
        return Restangular.all('/userbooks').getList()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    }
}]);


app.factory('currentUserFact', function () {
    return {
        user: {
            userId: '',
            userEmail: '',
        }
    }
});

addBooks.controller('AddBooksCtrl', ['BookSearch', 'BooksActions', function(BookSearch, BooksActions) {
    this.bookSearchLang = false;

    this.searchBook = function () {
        if (this.bookSearchField.length > 2) {
            BookSearch.findBooks(this.bookSearchField, this.bookSearchLang).then((response) => {
                console.log(response.data);
                this.foundBooks = response.data;
            });
        }
    };

    this.addToUserBooks = function(foundBook) {
        BooksActions.addToUsersBooks(foundBook).then((response) => {
            console.log(response);
        });
    }
}]);




userProfile.controller('UserProfileCtrl', ['UserProfileHandler', '$http', function (UserProfileHandler, $http) {
    UserProfileHandler.getOutcomingRequests().then((response) => {
        this.outcomingRequests = response;
        console.log(this.outcomingRequests)
    });

    UserProfileHandler.getUserBooks().then((response) => {
        this.userBooks = response;
        console.log(this.userBooks)
    });

    this.userData = {
        'email': sessionStorage.getItem('userEmail'),
        'name':sessionStorage.getItem('userName'),
        'city':sessionStorage.getItem('userCity'),
    }
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




addBooks.directive('addBooksForm', function () {
   return {
       restrict: 'E',
       scope: {},
       templateUrl: 'templates/add-books-form.html',
       controller: 'AddBooksCtrl',
       controllerAs: 'addBooksCtrl',
   }
});


userProfile.directive('userProfile', function () {
   return {
       restrict: 'E',
       scope: {},
       templateUrl: 'templates/user-profile.html',
       controller: 'UserProfileCtrl',
       controllerAs: 'userProfileCtrl',
   }
});


module.exports = app;