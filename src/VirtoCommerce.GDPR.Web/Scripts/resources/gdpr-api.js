angular.module('GDPRModule')
    .factory('GDPRModule.webApi', ['$resource', function ($resource) {
        return $resource('api/GDPRModule');
}]);
