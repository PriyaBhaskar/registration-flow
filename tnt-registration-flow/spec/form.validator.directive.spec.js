describe('tnt-registration-flow.Form Validator', function() {
    'use strict';

    var controller, DeferredObj, deferredObj1, element, userRegisterForm, rootScope, $scope, vm, appConstants, registerService, registerServiceData;

    beforeEach(module('tnt'));
    beforeEach(module('app.tnt-registration-flow'));

    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form novalidate id="userRegisterForm" name="userRegisterForm" class="user-register-form" ng-submit="userRegisterForm.$valid && $ctrl.submitUserRegistration(user.email, user.password)">\r\n		<div class="form-enter-desc">Please enter your details</div>\r\n		<fieldset class="form-data">\r\n			<input class="input-details" type="email" name="email" ng-model="user.email" placeholder="Email"/>\r\n			<span ng-if="userRegisterForm.email.$invalid" class="error-msg">Please enter a valid email id</span>\r\n			<input class="input-details" type="password" name="userpassword" ng-model="user.password" placeholder="New password" required tnt-form-validator/>\r\n			<div ng-if="userRegisterForm.userpassword.$invalid">\r\n				<span class="error-msg">Please enter a valid password. </span>\r\n					<ul class="password-rules-msg">Your password should meet the following rules:\r\n						<li ng-if="!validate.isOrdered">Passwords must include one increasing straight of at least three letters,\r\n							like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn\'t\r\n							count.</li>\r\n						<li ng-if="!validate.isIgnoreSelected">Passwords may not contain the letters i, o, or l, as these letters can be mistaken\r\n							for other characters and are therefore confusing.\r\n						</li>\r\n						<li ng-if="!validate.isOverlapping">Passwords must contain at least two non-overlapping pairs of letters,\r\n							like aa, bb, or zz.</li>\r\n						<li ng-if="!validate.islength">Passwords cannot be longer than 32 characters.</li>\r\n						<li ng-if="validate.isUppercase">Passwords can only contain lower case alphabetic characters.</li>\r\n					</ul>\r\n			</div>\r\n			<input class="input-details" type="password" name="confirmpassword" ng-model="user.confirmpassword" placeholder="Confirm New password" required ng-pattern="{{user.password}}" tnt-form-validator/>\r\n			<span ng-if="userRegisterForm.confirmpassword.$invalid" class="error-msg">Please confirm your password correctly</span>\r\n		</fieldset>\r\n		<div class="input-agreement">\r\n			<input type="checkbox" name="signInAgreement" value="true">I agree to TNT\'s <a class="signInLink" href="http://www.tnt.com/express/en_gb/site/home/terms-conditions.html">terms and condition</a>\r\n		</div>\r\n		<button form="userRegisterForm" type="submit" class="user-register-submit" ng-class="userRegisterForm.$valid ? \'enable-submit\':\'disable-submit\'" value="Submit">Next</button>\r\n		<div class="errors">\r\n			<div ng-if="$ctrl.register.success" class="success-msg">You have received an e-mail to confirm your registration.</div>\r\n			<div ng-if="$ctrl.register.error" class="error-msg">Something went wrong. Please try again later.</div>\r\n		</div>\r\n	</form>'
        );
        $scope.model = { userpassword: null };
        $compile(element)($scope);
        $scope.$digest();
        userRegisterForm = $scope.userRegisterForm;
    }));

    afterEach(inject(function(){
    }));


    describe('tnt form validation', function() {
        it('should pass with userpassword', function() {
            userRegisterForm.userpassword.$setViewValue('aabcc');
            expect($scope.userRegisterForm.userpassword.$modelValue).toEqual('aabcc');
            expect(userRegisterForm.userpassword.$valid).toBe(true);
        });
        it('should not pass with userpassword', function() {
            userRegisterForm.userpassword.$setViewValue('ac');
            expect($scope.userRegisterForm.userpassword.$viewValue).toEqual('ac');
            expect(userRegisterForm.userpassword.$invalid).toBe(true);
        });
        it('should not pass with uppercase userpassword', function() {
            userRegisterForm.userpassword.$setViewValue('ACsdf');
            expect($scope.userRegisterForm.userpassword.$viewValue).toEqual('ACsdf');
            expect(userRegisterForm.userpassword.$invalid).toBe(true);
        });

        it('should not pass with unordering userpassword', function() {
            userRegisterForm.userpassword.$setViewValue('abbceffg');
            expect($scope.userRegisterForm.userpassword.$viewValue).toEqual('abbceffg');
            expect(userRegisterForm.userpassword.$invalid).toBe(true);
        });
    });



});

