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

            function anonymizeContact() {
                var dialog = {
                    id: 'confirmAnonymize',
                    title: 'gdpr.blades.contact-detail.commands.anonymize.message.title',
                    message: 'gdpr.blades.contact-detail.commands.anonymize.message.text',
                    callback: function (anonymize) {
                        if (anonymize) {
                            blade.isLoading = true;
                            gdprApi.anonymize({ id: blade.currentEntityId }, function (data) {
                                blade.isLoading = false;
                                $scope.bladeClose();
                                blade.parentBlade.refresh(true);
                                if (data.securityAccounts[0]) {
                                    data.email = data.securityAccounts[0].email ?? '';
                                    data.login = data.securityAccounts[0].userName ?? '';
                                }
                                else {
                                    data.email = '';
                                    data.login = '';
                                }
                                blade.parentBlade.selectNode(data);
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
                    name: 'gdpr.blades.contact-detail.commands.anonymize.label', icon: 'fas fa-eraser',
                    executeMethod: anonymizeContact,
                    canExecuteMethod: function () {
                        return true;
                    },
                    permission: 'gdpr:anonymize'
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
