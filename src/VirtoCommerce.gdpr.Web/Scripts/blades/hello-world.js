angular.module('gdprModule')
    .controller('gdprModule.helloWorldController', ['$scope', 'gdprModule.webApi', function ($scope, api) {
        var blade = $scope.blade;
        blade.title = 'gdprModule';

        blade.refresh = function () {
            api.get(function (data) {
                blade.title = 'gdprModule.blades.hello-world.title';
                blade.data = data.result;
                blade.isLoading = false;
            });
        };

        blade.refresh();
    }]);
