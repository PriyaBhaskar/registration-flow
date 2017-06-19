describe('tnt-registration-flow.mainController', function() {
    'use strict';

    var controller, createController, ctrl, httpBackend, DeferredObj, element, rootScope, scope, vm, appConstants, registerService, registerServiceData;

    beforeEach(module('tnt'));
    beforeEach(module('app.tnt-registration-flow'));

    beforeEach(inject(function($injector, $rootScope, $compile, $componentController, $templateCache) {
        scope = $rootScope.$new();
        rootScope = $injector.get('$rootScope');
        appConstants = $injector.get('appConstants');

        DeferredObj = function(){
            this.then = function (_successCallback, _errorCallback) {
                this.successCallback = _successCallback;
                this.errorCallback = _errorCallback;
                this.catchCallback = _errorCallback;
                return this;
            };
            this.catch = function (error){
                this.catchCallback = error;
            };
            this.resolve = function (data) {
                this.successCallback(data);
            };
            this.reject = function (error) {
                this.catchCallback(error);
            };
        };

        registerServiceData = {};
        registerService = {
            registerUser: function() {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            }
        };

        $templateCache.put("tnt-registration-flow/module.html", '<section class="tnt-registration-flow">\r\n	<form novalidate id="userRegisterForm" name="userRegisterForm" class="user-register-form" ng-submit="userRegisterForm.$valid && $ctrl.submitUserRegistration(user.email, user.password)">\r\n		<div class="form-enter-desc">Please enter your details</div>\r\n		<fieldset class="form-data">\r\n			<input class="input-details" type="email" name="email" ng-model="user.email" placeholder="Email"/>\r\n			<span ng-if="userRegisterForm.email.$invalid" class="error-msg">Please enter a valid email id</span>\r\n			<input class="input-details" type="password" name="userpassword" ng-model="user.password" placeholder="New password" required tnt-form-validator/>\r\n			<div ng-if="userRegisterForm.userpassword.$invalid">\r\n				<span class="error-msg">Please enter a valid password. </span>\r\n					<ul class="password-rules-msg">Your password should meet the following rules:\r\n						<li ng-if="!validate.isOrdered">Passwords must include one increasing straight of at least three letters,\r\n							like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn\'t\r\n							count.</li>\r\n						<li ng-if="!validate.isIgnoreSelected">Passwords may not contain the letters i, o, or l, as these letters can be mistaken\r\n							for other characters and are therefore confusing.\r\n						</li>\r\n						<li ng-if="!validate.isOverlapping">Passwords must contain at least two non-overlapping pairs of letters,\r\n							like aa, bb, or zz.</li>\r\n						<li ng-if="!validate.islength">Passwords cannot be longer than 32 characters.</li>\r\n						<li ng-if="validate.isUppercase">Passwords can only contain lower case alphabetic characters.</li>\r\n					</ul>\r\n			</div>\r\n			<input class="input-details" type="password" name="confirmpassword" ng-model="user.confirmpassword" placeholder="Confirm New password" required ng-pattern="{{user.password}}" tnt-form-validator/>\r\n			<span ng-if="userRegisterForm.confirmpassword.$invalid" class="error-msg">Please confirm your password correctly</span>\r\n		</fieldset>\r\n		<div class="input-agreement">\r\n			<input type="checkbox" name="signInAgreement" value="true">I agree to TNT\'s <a class="signInLink" href="http://www.tnt.com/express/en_gb/site/home/terms-conditions.html">terms and condition</a>\r\n		</div>\r\n		<button form="userRegisterForm" type="submit" class="user-register-submit" ng-class="userRegisterForm.$valid ? \'enable-submit\':\'disable-submit\'" value="Submit">Next</button>\r\n		<div class="errors">\r\n			<div ng-if="$ctrl.register.success" class="success-msg">You have received an e-mail to confirm your registration.</div>\r\n			<div ng-if="$ctrl.register.error" class="error-msg">Something went wrong. Please try again later.</div>\r\n		</div>\r\n	</form>\r\n</section>')
        element = angular.element('<tnt-registration-flow></tnt-registration-flow>');
        element = $compile(element)(scope);
        controller = $componentController('tntRegistrationFlow', {$scope: scope,
            '$http': httpBackend,
            'appConstants': appConstants,
            'registerService': registerService});
        scope.$apply();
        vm = controller;
    }));

    afterEach(inject(function(){
    }));


    it('should initialize controller', function() {
        expect(vm).not.toBeNull();
    });

    it('Controller should initialize default variables', function() {
        expect(vm.register).toBeDefined();
    });

    it('Should fail to submit the user registration form', function() {
        var data = {
            email : {value: 'priya.sagu@gmail.com'},
            userpassword : {value: 'aabcc'}
        };
        var error = {'status': 500}
        vm.submitUserRegistration(data);
        registerService.deferredObj.reject(error);
        expect(vm.register.error).toEqual(true);
    });


    it('Should submit the user registration form', function() {
        var data = {
            email : {value: 'priya.sagu@gmail.com'},
            userpassword : {value: 'aabcc'}
        };

        vm.submitUserRegistration(data);
        registerService.deferredObj.resolve(registerServiceData);
        expect(vm.register.success).toEqual(true);
    });




});

