'use strict';

module.exports =
    angular.module('app')
        .controller('ModalInstanceCtrl', require('./modal-window/modal-instance.controller'))
        .service('ModalWindow',require('./modal-window/modal-window.service'));