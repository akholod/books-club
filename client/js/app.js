'use strict';

require('./user-auth');
require('./books-catalog');
require('./add-books');
require('./user-profile');

module.exports =  angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'booksCatalog', 'addBooks', 'userProfile', 'userAuth']);
