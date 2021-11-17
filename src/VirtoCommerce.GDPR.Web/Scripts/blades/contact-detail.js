angular.module('virtoCommerce.gdpr')
    .controller('virtoCommerce.gdpr.contactDetailController', ['$scope', 'platformWebApp.dialogService', 'virtoCommerce.gdpr.webApi',
        function ($scope, dialogService, gdprApi) {
            var blade = $scope.blade;
            blade.headIcon = 'fas fa-address-card';

            function initializeBlade(data) {
                blade.currentEntity = angular.copy(data);
                blade.origEntity = data;
                blade.isLoading = false;
            }

            function deleteContact() {
                var dialog = {
                    id: 'confirmDelete',
                    title: 'gdpr.blades.contact-detail.commands.remove.message.title',
                    message: 'gdpr.blades.contact-detail.commands.remove.message.text',
                    callback: function (remove) {
                        if (remove) {
                            blade.isLoading = true;
                            gdprApi.delete({ id: blade.currentEntityId }, function () {
                                $scope.bladeClose();
                                blade.parentBlade.refresh();
                            });
                        }
                    }
                }
                dialogService.showConfirmationDialog(dialog);
            }

            function downloadContactData() {
                return true;
            }

            blade.toolbarCommands = [
                {
                    name: 'gdpr.blades.contact-detail.commands.remove.label', icon: 'fas fa-eraser',
                    executeMethod: deleteContact,
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'virtoCommerce.gdpr:delete'
                },
                {
                    name: 'gdpr.blades.contact-detail.commands.download.label', icon: 'fas fa-download',
                    executeMethod: downloadContactData,
                    canExecuteMethod: function () {
                        return true;
                    }//,                    permission: 'virtoCommerce.gdpr:download'
                }
            ];

            initializeBlade(blade.currentEntity);
        }]);
