function authorize(role) {
  var errorStatus = 404;
  var errorMessage = 'Not found.';

  return function(request, response, next) {
    if(!request.user || request.user.role !== role) {
      denyAccess(response);
    }
    else {
      next();
    }
  };

  function denyAccess(response) {
    response.status(errorStatus)
      .json({ error: errorMessage });
  }
}

module.exports = authorize;
