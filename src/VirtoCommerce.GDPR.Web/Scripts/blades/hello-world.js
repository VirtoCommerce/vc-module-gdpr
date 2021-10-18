angular.module('GDPRModule')
    .controller('GDPRModule.helloWorldController', ['$scope', 'GDPRModule.webApi', function ($scope, api) {
        var blade = $scope.blade;
        blade.title = 'GDPRModule';

        blade.refresh = function () {
            api.get(function (data) {
                blade.title = 'GDPRModule.blades.hello-world.title';
                blade.data = data.result;
                blade.isLoading = false;
            });
        };

        blade.refresh();
    }]);
