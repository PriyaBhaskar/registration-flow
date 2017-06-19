(function() {
    'use strict';

    angular
        .module('tnt.mock')
        .factory('registerUserDataBackend', registerUserDataBackend);

    registerUserDataBackend.$inject = ['$location', 'mockHttp'];

    function registerUserDataBackend($location, mockHttp) {
        var service = {
            respond: respond
        };

        return service;

        function respond(path) {
            if(path === '/register') {
                return mockHttp.get('/stubs/services/registeruser-data-backend.json');
            }
        }
    }
})();