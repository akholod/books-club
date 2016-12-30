'use strict';

const app = angular.module('myApp', ['restangular', 'ui.router', 'ngAnimate']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
    $stateProvider
        .state('books', {
        url: '/books',
        template: '<main-books-catalog></main-books-catalog>'
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
        });

    function authenticate($q, $state, $timeout) {
        if (sessionStorage.getItem('userEmail')) {
            return $q.when()
        } else {
            $timeout(function () {
                alert('Not authorized!');
                $state.go('login');
            });

        }
    }

    $httpProvider.interceptors.push('AuthUser');

    $urlRouterProvider.otherwise('/books');

    RestangularProvider.setBaseUrl("http://localhost:3000/api");
});

app.service('AuthUser',  function ($q, $rootScope, $injector) {
    this.response = (data) => {
        $rootScope.user = {
            userId: sessionStorage.getItem('userId'),
            userEmail: sessionStorage.getItem('userEmail'),
        };
        return $q.resolve(data);
    };
    this.responseError = (rejection) => {
        if(rejection.status === 401) {
            alert('Not authorized');
            $injector.get('$state').go('login');
        }
        return $q.reject(rejection);
    }
});

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

app.service('BooksActions', ['Restangular', function(Restangular) {
    this.createTradeRequest = function(bookId) {
        return Restangular.one('books', bookId).put()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}]);

app.service('BookSearch', ['$http', function($http) {
    this.findBooks = function (searchBookTitle, searchBookLang = 'en') {
        return $http.post('api/books/search', {
            "bookTitle" : searchBookTitle,
            "bookLang" : searchBookLang,
        }).then((response) => {
            console.log(response)
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}]);

/*app.service('AddBookToUserBooks', ['Restangular', function(Restangular) {
    this.addBookToUserBooks = function(bookData) {
        return Restangular.one('books', bookId).put()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
}]);*/

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

app.service('UserHandler', ['$http', 'Session', function($http, Session) {
    this.loginUser = function(loginData) {
        return $http.post('/login', {
            "email": loginData.email,
            "password": loginData.password,
        }).then((response) => {
            Session.create(response.data.userId, 'user', response.data.local.email);
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
            Session.create(response.data.userId, 'user', response.data.local.email);
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
    this.create = function (userId, userRole, userEmail) {
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userEmail', userEmail);
        sessionStorage.setItem('userRole', userRole);
    };
    this.destroy = function () {
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('userEmail', '');
        sessionStorage.setItem('userRole', '');
    };
});

app.factory('currentUserFact', function () {
    return {
        user: {
            userId: '',
            userEmail: '',
        }
    }
});

app.controller('BooksCtrl', ['BooksCatalog', function(BooksCatalog) {
    BooksCatalog.getBooks().then((response) => {
        this.books = response;
    });
}]);

app.controller('BookDescriptionCtrl', ['BooksCatalog', '$stateParams', function(BooksCatalog, $stateParams) {
    BooksCatalog.getBook($stateParams.bookId).then((response) => {
        this.book = response;
    });
}]);

app.controller('AddBooksCtrl', ['BookSearch', function(BookSearch) {
    this.bookSearchLang = false;

    this.searchBook = function () {
        if (this.bookSearchField.length > 2) {
            BookSearch.findBooks(this.bookSearchField, this.bookSearchLang).then((response) => {
                this.foundBooks = response.data;
            });
        }
    };
}]);

app.controller('SignupCtrl', ['$state', '$scope', 'UserHandler', 'UserFormsValidator', 'currentUserFact', function( $state, $scope, UserHandler, UserFormsValidator, currentUserFact) {
    $scope.user = currentUserFact;

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
            console.log('askdjashdkhabkjd');
            $scope.user.userEmail = response.data.local.email;
            $scope.user.userId = response.data.userId;
            console.log('Check');
            $state.go("books");
            this.signupFailureMessage = '';

        });
    }
}]);

app.controller('LoginCtrl', ['$state', '$scope', 'UserHandler', 'currentUserFact', function($state, $scope, UserHandler, currentUserFact) {
    $scope.user = currentUserFact;
    this.login = function () {
        UserHandler.loginUser(this.loginData).then((response) => {
            if(response.data.userId) {
                $scope.user.userEmail = response.data.local.email;
                $scope.user.userId = response.data.userId;
                $state.go("books");
            }
        });
    }
}]);


app.controller('CurrentUserCtrl', ['$state', '$rootScope', '$scope', 'UserHandler', 'currentUserFact', function($state, $rootScope, $scope, UserHandler, currentUserFact) {

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
}]);



app.directive('mainBooksCatalog', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/main-books-catalog.html',
        controller: 'BooksCtrl',
        controllerAs: 'booksCtrl',
    };
});

app.directive('bookCard', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/book-card.html',
        controller: 'BookDescriptionCtrl',
        controllerAs: 'bookDescriptionCtrl',
    };
});

app.directive('addBooksForm', function () {
   return {
       restrict: 'E',
       scope: {},
       templateUrl: 'templates/add-books-form.html',
       controller: 'AddBooksCtrl',
       controllerAs: 'addBooksCtrl',
   }
});

app.directive('signupForm', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/signup-form.html',
        controller: 'SignupCtrl',
        controllerAs: 'signupCtrl',
    };
});

app.directive('loginForm', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/login-form.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl',
    };
});
app.directive('currentUser', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/current-user.html',
        controller: 'CurrentUserCtrl',
        controllerAs: 'currentUserCtrl',
    };
});

