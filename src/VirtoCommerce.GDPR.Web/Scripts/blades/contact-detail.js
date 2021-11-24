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
                gdprApi.download({ id: blade.currentEntityId }, function (data) {
                    data.jsonTextInfo = JSON.stringify(data, null, "\t");
                    var a = document.createElement("a");
                    var file = new Blob([data.jsonTextInfo], { type: 'application/json' });
                    a.href = URL.createObjectURL(file);
                    var d = new Date();
                    var date = d.getFullYear() + '.' + d.getMonth() + '.' + d.getDate() + '_' + d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds();
                    var fileName = data.fullName + '_' + date + '.json';
                    a.download = fileName.replace(/\s+/g, '');
                    a.click();
                });
            }

            blade.toolbarCommands = [
                {
                    name: 'gdpr.blades.contact-detail.commands.remove.label', icon: 'fas fa-eraser',
                    executeMethod: deleteContact,
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'gdpr:delete'
                },
                {
                    name: 'gdpr.blades.contact-detail.commands.download.label', icon: 'fas fa-download',
                    executeMethod: downloadContactData,
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'gdpr:download'
                }
            ];

            initializeBlade(blade.currentEntity);
        }]);
