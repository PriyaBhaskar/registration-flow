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
            console.log("success");
            vm.register.success = true;
        }

        function showErrorNotification(error) {
            console.log('false');
            if(error.status >= 500 && error.status <=599) {
                console.log("false");
                vm.register.error = true;
            }
        }

    }


})();


angular.module('app.tnt-registration-flow').constant('appConstants', {
    registerApi: 'http://localhost:9000/register'
});

(function() {
    'use strict';

    angular
        .module('app.tnt-registration-flow')
		.directive('tntFormValidator', FormPasswordValidator);
		
		function FormPasswordValidator() {
        return {
            require: 'ngModel',
            scope: {

            },
            link: function (scope, elm, attrs, ctrl) {
                var isValid = true;
                ctrl.$$scope.isValid = isValid;
                ctrl.$validators.userpassword = function (modelValue, viewValue) {
                        var passwordLength = modelValue ? modelValue.length: 0;
                        ctrl.$$scope.validate = {};

                        var isUppercase = function () {
                            var i=0;
                            while (i < passwordLength) {
                                if (modelValue.charAt(i) === modelValue.charAt(i).toUpperCase()) {
                                    ctrl.$$scope.validate.isUppercase = true;
                                    return true;
                                }
                                ctrl.$$scope.validate.isUppercase = false;
                                return false;
                            }
                        }

                        var isOrdered = function () {
                            for (var i=0; i<passwordLength; i++) {
                                var temp = modelValue.charCodeAt(i);
                                if( temp+1 === modelValue.charCodeAt(i+1)){
                                    if(temp+2 === modelValue.charCodeAt(i+2) ) {
                                        ctrl.$$scope.validate.isOrdered = true;
                                        return true;
                                    }
                                }
                            }
                            ctrl.$$scope.validate.isOrdered = false;
                            return false;
                        }

                        var isOverlapping = function() {
                            var match = modelValue.match(/(\w)\1+/ig);
                            if(match && match.length === 2){
                                ctrl.$$scope.validate.isOverlapping = true;
                                return true;
                            }
                            ctrl.$$scope.validate.isOverlapping = false;
                            return false;
                        }
                        var islength = function () {
                            ctrl.$$scope.validate.islength = !ctrl.$isEmpty(modelValue) && passwordLength <= 32;
                            return ctrl.$$scope.validate.islength;
                        }
                        var isIgnoreSelected = function () {
                            ctrl.$$scope.validate.isIgnoreSelected = modelValue.search(/i|o|l/) === -1;
                            return ctrl.$$scope.validate.isIgnoreSelected;
                        }

                        isValid = islength() &&
                                  !isUppercase() &&
                                  isIgnoreSelected() &&
                                  isOverlapping() &&
                                  isOrdered();

                        ctrl.$setValidity('userpassword', isValid);
                        return isValid;
                }


            }

            
        };

    }
})();
(function () {
    'use strict';

    angular.module('app.tnt-registration-flow')
        .factory('abortRequestService', abortRequestService);
    abortRequestService.$inject = [];

    function abortRequestService() {

        function abort(id, abortHttpRequestList) {

            function abortRequestFn(promise, i) {
                promise.resolve();
                abortHttpRequestList.splice(i, 1);
            }

            if (angular.isDefined(id)) {
                abortRequestFn(abortHttpRequestList[id], id);
            } else {
                angular.forEach(abortHttpRequestList, abortRequestFn);
            }

        }

        return {
            remove: abort
        };
    }

})();
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
angular.module('app.tnt-registration-flow').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('tnt-registration-flow/module.html',
    "<section class=\"tnt-registration-flow\">\r" +
    "\n" +
    "\t<form novalidate id=\"userRegisterForm\" name=\"userRegisterForm\" class=\"user-register-form\" ng-submit=\"!userRegisterForm.$pristine &&  userRegisterForm.$valid && $ctrl.submitUserRegistration(userRegisterForm)\">\r" +
    "\n" +
    "\t\t<div class=\"form-enter-desc\">Please enter your details</div>\r" +
    "\n" +
    "\t\t<fieldset class=\"form-data\">\r" +
    "\n" +
    "\t\t\t<input class=\"input-details\" type=\"email\" name=\"email\" ng-model=\"user.email\" placeholder=\"Email\"/>\r" +
    "\n" +
    "\t\t\t<span ng-if=\"userRegisterForm.email.$invalid\" class=\"error-msg\">Please enter a valid email id</span>\r" +
    "\n" +
    "\t\t\t<input class=\"input-details\" type=\"password\" name=\"userpassword\" ng-model=\"user.password\" placeholder=\"New password\" required tnt-form-validator/>\r" +
    "\n" +
    "\t\t\t<div ng-if=\"!userRegisterForm.userpassword.$pristine && userRegisterForm.userpassword.$invalid\">\r" +
    "\n" +
    "\t\t\t\t<span class=\"error-msg\">Please enter a valid password. </span>\r" +
    "\n" +
    "\t\t\t\t\t<ul class=\"password-rules-msg\">Your password should meet the following rules:\r" +
    "\n" +
    "\t\t\t\t\t\t<li ng-if=\"!validate.isOrdered\">Passwords must include one increasing straight of at least three letters,\r" +
    "\n" +
    "\t\t\t\t\t\t\tlike abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't\r" +
    "\n" +
    "\t\t\t\t\t\t\tcount.</li>\r" +
    "\n" +
    "\t\t\t\t\t\t<li ng-if=\"!validate.isIgnoreSelected\">Passwords may not contain the letters i, o, or l, as these letters can be mistaken\r" +
    "\n" +
    "\t\t\t\t\t\t\tfor other characters and are therefore confusing.\r" +
    "\n" +
    "\t\t\t\t\t\t</li>\r" +
    "\n" +
    "\t\t\t\t\t\t<li ng-if=\"!validate.isOverlapping\">Passwords must contain at least two non-overlapping pairs of letters,\r" +
    "\n" +
    "\t\t\t\t\t\t\tlike aa, bb, or zz.</li>\r" +
    "\n" +
    "\t\t\t\t\t\t<li ng-if=\"!validate.islength\">Passwords cannot be longer than 32 characters.</li>\r" +
    "\n" +
    "\t\t\t\t\t\t<li ng-if=\"validate.isUppercase\">Passwords can only contain lower case alphabetic characters.</li>\r" +
    "\n" +
    "\t\t\t\t\t</ul>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t<input class=\"input-details\" type=\"password\" name=\"confirmpassword\" ng-model=\"user.confirmpassword\" placeholder=\"Confirm New password\" required ng-pattern=\"{{user.password}}\" tnt-form-validator/>\r" +
    "\n" +
    "\t\t\t<span ng-if=\"!userRegisterForm.confirmpassword.$pristine && userRegisterForm.confirmpassword.$invalid\" class=\"error-msg\">Please confirm your password correctly</span>\r" +
    "\n" +
    "\t\t</fieldset>\r" +
    "\n" +
    "\t\t<div class=\"input-agreement\">\r" +
    "\n" +
    "\t\t\t<input type=\"checkbox\" name=\"signInAgreement\" value=\"true\">I agree to TNT's <a class=\"signInLink\" href=\"http://www.tnt.com/express/en_gb/site/home/terms-conditions.html\">terms and condition</a>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<button form=\"userRegisterForm\" type=\"submit\" class=\"user-register-submit\" ng-class=\"userRegisterForm.$valid ? 'enable-submit':'disable-submit'\" value=\"Submit\">Next</button>\r" +
    "\n" +
    "\t\t<div class=\"errors\">\r" +
    "\n" +
    "\t\t\t<div ng-if=\"$ctrl.register.success\" class=\"success-msg\">You have received an e-mail to confirm your registration.</div>\r" +
    "\n" +
    "\t\t\t<div ng-if=\"$ctrl.register.error\" class=\"error-msg\">Something went wrong. Please try again later.</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</section>"
  );

}]);
