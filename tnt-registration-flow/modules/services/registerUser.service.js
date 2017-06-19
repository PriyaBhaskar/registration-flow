(function() {
    'use strict';

angular.module('app.tnt-registration-flow')
    .factory('registerService', registerService);
    registerService.$inject= [
        '$http',
        '$q',
        'appConstants',
        'abortRequestService'];
        function registerService($http, $q, appConstants, abortRequestService) {
            'use strict';

            var abortHttpRequestList = [];

            function registerUser(formdata) {
                var response = $q.defer(),
                    abortHttpRequest = $q.defer(),
                    settings = {
                        method: 'POST',
                        data: formdata,
                        url: appConstants.registerApi,
                        timeout: abortHttpRequest.promise
                    },
                    id = abortHttpRequestList.length;

                abortHttpRequestList.push(abortHttpRequest);

                $http(settings).then(function (data) {
                        response.resolve(data);
                    },function (error) {
                        response.reject(error);
                    }).finally(function () {
                        abortRequestService.remove(id, abortHttpRequestList);
                    });
                return response.promise;
            }

            return {
                registerUser: registerUser
            };
        }
})();