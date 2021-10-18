// Call this to register your module to main application
var moduleName = 'gdprModule';

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('workspace.gdprModuleState', {
                    url: '/gdprModule',
                    templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                    controller: [
                        '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                            var newBlade = {
                                id: 'blade1',
                                controller: 'gdprModule.helloWorldController',
                                template: 'Modules/$(VirtoCommerce.gdpr)/Scripts/blades/hello-world.html',
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
            //Register module in main menu
            var menuItem = {
                path: 'browse/gdprModule',
                icon: 'fa fa-cube',
                title: 'gdprModule',
                priority: 100,
                action: function () { $state.go('workspace.gdprModuleState'); },
                permission: 'gdprModule:access'
            };
            mainMenuService.addMenuItem(menuItem);
        }
    ]);
