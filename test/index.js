import chai from 'chai';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';

import authorize from '../lib';

var expect = chai.expect;

describe('authorize(role)', function () {
  var request, response, next;

  beforeEach(function() {
    response = httpMocks.createResponse();
    next = sinon.spy();
  });

  describe('with correct role', function() {
    var role = 'test';

    it('authorizes the request', function() {
      request = createRequestWithUser(role);
      var authorizeTest = authorize(role);

      authorizeTest(request, response, next);

      expect(next.called).to.be.true;
    });
  });

  describe('with incorrect role', function() {
    var role = 'test';

    it('does not authorize the request', function() {
      request = httpMocks.createRequest();
      var authorizeTest = authorize(role);

      authorizeTest(request, response, next);

      expect(next.called).to.be.false;
      expect(response.statusCode).to.equal(404);
    });
  });

  function createRequestWithUser(role) {
    var request = httpMocks.createRequest();
    request.user = {};
    if(role)
      request.user.role = role;
    return request;
  }
});
