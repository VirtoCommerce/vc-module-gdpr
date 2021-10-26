angular.module('virtoCommerce.gdpr')
    .factory('virtoCommerce.gdpr.webApi', ['$resource', function ($resource) {
        return $resource('api/contacts', {}, {
            getByIds: {
                method: 'GET',
                url: 'api/contacts',
                isArray: true
            },
            search: { method: 'POST', url: 'api/contacts/search' },
            update: { method: 'PUT', url: 'api/contacts/update' },
            delete: { method: 'DELETE', url: 'api/contacts/delete' }
        });
    }]);
