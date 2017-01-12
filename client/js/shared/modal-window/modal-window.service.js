'use strict';

module.exports = function ($uibModal, $log) {
    this.openModalWindow = function (bodyMessage, headMessage = 'Warning!') {
        var modalData = {
            bodyMessage: bodyMessage,
            headMessage: headMessage,
        };
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./modal-window.html'),
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
}