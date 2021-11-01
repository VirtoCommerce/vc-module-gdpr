angular.module('virtoCommerce.gdpr')
    .factory('virtoCommerce.gdpr.webApi', ['$resource', function ($resource) {
        return $resource('api/gdpr', {}, {
            search: { method: 'POST', url: 'api/gdpr/contacts/search' },
            delete: { method: 'DELETE', url: 'api/gdpr/contacts/delete' }
        });
    }]);
