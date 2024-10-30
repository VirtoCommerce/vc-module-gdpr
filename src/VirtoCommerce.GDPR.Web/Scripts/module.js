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
                                id: 'gdprMain',
                                currentEntity: { id: null },
                                controller: 'virtoCommerce.gdpr.gdprMainController',
                                template: 'Modules/$(VirtoCommerce.GDPR)/Scripts/blades/gdpr-main.tpl.html',
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
                icon: 'fas fa-key',
                title: 'gdpr.blades.main-title',
                priority: 100,
                action: function () { $state.go('workspace.gdpr'); },
                permission: 'gdpr:access'
            };
            mainMenuService.addMenuItem(menuItem);
        }
    ]);
