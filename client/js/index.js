'use strict';

//webpack dependencies
require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-ui-bootstrap');
require('restangular');

// application initialization
require('./app');

require('./app.config');

require('./shared');

require('./services');

//style scss compiling

require("!style-loader!css-loader!resolve-url-loader!sass-loader!../styles/main.scss");

