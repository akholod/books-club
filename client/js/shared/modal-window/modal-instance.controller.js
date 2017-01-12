'use strict';

module.exports = function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.headMessage = items.headMessage;
    $ctrl.bodyMessage = items.bodyMessage;
    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}