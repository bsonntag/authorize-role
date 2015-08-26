import chai from 'chai';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';

import authorize from '../lib';

var expect = chai.expect;

describe('authorize(role)', function () {
  var request, response, next;
  var role = 'test';

  beforeEach(function() {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
    next = sinon.spy();
  });

  describe('with correct role', function() {
    it('authorizes the request', function() {
      addUserToRequest(role);

      callAuthorize();

      expect(next.called).to.be.true;
    });
  });

  describe('with incorrect role', function() {
    it('responds with 404', function() {
      callAuthorize();

      expect(next.called).to.be.false;
      expect(response.statusCode).to.equal(404);
    });
  });

  function addUserToRequest(role) {
    request.user = {};
    if(role) {
      request.user.role = role;
    }
  }

  function callAuthorize() {
    var authorizeRole = authorize(role);
    authorizeRole(request, response, next);
  }
});
