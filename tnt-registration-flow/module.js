(function() {
    'use strict';

    angular
        .module('app.tnt-registration-flow', [])
        .component('tntRegistrationFlow', {
            bindings: {
            },
            templateUrl: 'tnt-registration-flow/module.html',
            controller: MainController
        });
        

    MainController.$inject = ['$scope', 'appConstants', 'registerService'];

    function MainController($scope, appConstants, registerService) {

        /*jshint validthis: true */
        var vm = this;
        vm.register = {};

        vm.submitUserRegistration = function(userRegisterForm) {
            var formdata= {
                "email": userRegisterForm.email.value,
                "password": userRegisterForm.userpassword.value
            }
            registerService.registerUser(formdata)
                        .then(showSuccessNotification)
                        .catch(showErrorNotification);

        }

        function showSuccessNotification() {
            vm.register.success = true;
        }

        function showErrorNotification(error) {
            if(error.status >= 500 && error.status <=599) {
                vm.register.error = true;
            }
        }

    }


})();

