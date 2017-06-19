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
