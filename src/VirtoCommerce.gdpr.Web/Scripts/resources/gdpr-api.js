angular.module('gdprModule')
    .factory('gdprModule.webApi', ['$resource', function ($resource) {
        return $resource('api/gdprModule');
}]);
