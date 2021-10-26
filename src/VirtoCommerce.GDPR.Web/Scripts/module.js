// Call this to register your module to main application
var moduleName = 'virtoCommerce.gdpr';

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('workspace.gdpr', {
                    url: '/GDPR',
                    templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                    controller: [
                        '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                            var newBlade = {
                                id: 'contactList',
                                currentEntity: { id: null },
                                controller: 'virtoCommerce.gdpr.contactListController',
                                template: 'Modules/$(VirtoCommerce.GDPR)/Scripts/blades/contact-list.tpl.html',
                                isClosingDisabled: true
                            };
                            bladeNavigationService.showBlade(newBlade);
                        }
                    ]
                });
        }
    ])

    .run(['platformWebApp.mainMenuService', 'platformWebApp.widgetService', '$state',
        function (mainMenuService, widgetService, $state) {
            var menuItem = {
                path: 'browse/GDPR',
                icon: 'fa fa-cube',
                title: 'GDPR',
                priority: 100,
                action: function () { $state.go('workspace.gdpr'); },
                permission: 'GDPR:access'
            };
            mainMenuService.addMenuItem(menuItem);
        }
    ]);
