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
                            };

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
                            };

                            var isOverlapping = function() {
                                var match = modelValue.match(/(\w)\1+/ig);
                                if(match && match.length === 2){
                                    ctrl.$$scope.validate.isOverlapping = true;
                                    return true;
                                }
                                ctrl.$$scope.validate.isOverlapping = false;
                                return false;
                            };

                            var islength = function () {
                                ctrl.$$scope.validate.islength = !ctrl.$isEmpty(modelValue) && passwordLength <= 32;
                                return ctrl.$$scope.validate.islength;
                            };

                            var isIgnoreSelected = function () {
                                ctrl.$$scope.validate.isIgnoreSelected = modelValue.search(/i|o|l/) === -1;
                                return ctrl.$$scope.validate.isIgnoreSelected;
                            };

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