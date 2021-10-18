// Call this to register your module to main application
var moduleName = 'GDPRModule';

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('workspace.GDPRModuleState', {
                    url: '/GDPRModule',
                    templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                    controller: [
                        '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                            var newBlade = {
                                id: 'blade1',
                                controller: 'GDPRModule.helloWorldController',
                                template: 'Modules/$(VirtoCommerce.GDPR)/Scripts/blades/hello-world.html',
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
                path: 'browse/GDPRModule',
                icon: 'fa fa-cube',
                title: 'GDPRModule',
                priority: 100,
                action: function () { $state.go('workspace.GDPRModuleState'); },
                permission: 'GDPRModule:access'
            };
            mainMenuService.addMenuItem(menuItem);
        }
    ]);
