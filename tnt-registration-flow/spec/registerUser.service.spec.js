describe('register.Service', function() {
	'use strict';

  var registerService, httpBackend, appConstants, abortService;

  beforeEach(module('app.tnt-registration-flow'));

  beforeEach(inject(function($injector) {    
    httpBackend = $injector.get('$httpBackend');
    registerService = $injector.get('registerService');
    appConstants = $injector.get('appConstants');
    abortService = $injector.get('abortRequestService');

  }));

  it('should register the user', function(){
    httpBackend.expectPOST(appConstants.registerApi).respond(200, {});
    var deferredObj = registerService.registerUser();
    deferredObj.then(function(data){
      expect(data.data).toEqual({});
    });
    httpBackend.flush();
  });

  it('should get default photo when employee photo fails to load', function(){
    httpBackend.expectPOST(appConstants.registerApi).respond(404);
    var deferredObj = registerService.registerUser();
    deferredObj.then(function(){}, function (error) {
      expect(error.status).toEqual(404);
    });
    httpBackend.flush();
  });

  it('should resolve deferred Object', function(){
    registerService.registerUser();
    abortService.remove();
  });

});
