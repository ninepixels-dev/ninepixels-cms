/* global _ */

'use strict';

modalDialogService.$inject = ['$uibModal'];
function modalDialogService($uibModal) {
    /*
     * Show classic modal
     */
    this.showModal = function (params) {
        _.extend(params, {windowClass: 'np-modal', backdrop: 'static'});
        return $uibModal.open(params);
    };

    this.showConfirmation = function (message, accept, decline) {
        return new Promise(function (resolve, reject) {
            return $uibModal.open({
                size: 'md',
                templateUrl: '/np-controller/templates/confirmation-dialog.html',
                controller: function ($uibModalInstance) {
                    this.message = message || 'Da li ste sigurni?';
                    this.accept = accept || 'Prihvati';
                    this.decline = decline || 'Otkaži';

                    this.ok = function () {
                        $uibModalInstance.close();
                        return resolve();
                    };
                    this.cancel = function () {
                        $uibModalInstance.close();
                        return reject();
                    };
                },
                controllerAs: 'confirmation'
            });
        });

    };
}

angular.module('ninepixels.ui.modalDialog', [])
        .service('modalDialog', modalDialogService);