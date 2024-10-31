angular.module('virtoCommerce.gdpr')
    .controller('virtoCommerce.gdpr.gdprMainController', ['$scope', 'platformWebApp.bladeUtils', 
        function ($scope, bladeUtils) {
            $scope.selectedNodeId = null;

            var blade = $scope.blade;

            blade.title = 'gdpr.blades.main-title';
            blade.subtitle = 'gdpr.blades.main-subtitle';
            blade.headIcon = 'fas fa-key';
            var bladeNavigationService = bladeUtils.bladeNavigationService;

            function initializeBlade() {
                var entities = [{
                    id: 1,
                    entityName: 'customers',
                    name: 'gdpr.blades.contact-list.title',
                    icon: 'fas fa-user'
                }];

                blade.currentEntities = entities;
                blade.isLoading = false;
            }

            blade.openBlade = function (data) {
                $scope.selectedNodeId = data.id;

                var newBlade = {
                    id: 'contactList',
                    currentEntity: { id: null },
                    title: 'gdpr.blades.contact-list.title',
                    controller: 'virtoCommerce.gdpr.contactListController',
                    template: 'Modules/$(VirtoCommerce.GDPR)/Scripts/blades/contact-list.tpl.html',
                };
                bladeNavigationService.showBlade(newBlade, blade);
            };

            initializeBlade();
        }]);
