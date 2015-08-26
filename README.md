# authorize-role
A simple role-based authorization middleware for [Express][express-url].

[![Build][travis-img]][travis-url]

## Installation

```
npm install --save authorize-role
```

## Usage

Import it with:

```
var authorize = require('authorize-role');
```

The `request` object must have a `user` property with a `role` for this to work.

To authorize a certain role, e.g. `'admin'`, you can do:

```
var app = express();
app.use(authorize('admin'));
```

This will make all requests fail with 404 if they do not have a `user.role` equal to `'admin'`.

## Licence

Licensed under [MIT](https://github.com/bsonntag/authorize-role/blob/master/LICENSE).

[express-url]: http://expressjs.com/
[travis-img]: https://api.travis-ci.org/bsonntag/authorize-role.svg
[travis-url]: https://travis-ci.org/bsonntag/authorize-role
