angular.module('virtoCommerce.gdpr')
    .factory('virtoCommerce.gdpr.webApi', ['$resource', function ($resource) {
        return $resource('api/gdpr', {}, {
            search: { method: 'POST', url: 'api/gdpr/contacts/search' },
            anonymize: { method: 'GET', url: 'api/gdpr/contacts/anonymize/:id' },
            download: { method: 'GET', url: 'api/gdpr/contacts/download/:id' }
        });
    }]);
