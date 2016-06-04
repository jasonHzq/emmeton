# emmeton

Enable you create files like emmet!

[![npm version](https://badge.fury.io/js/emmeton.png)](https://badge.fury.io/js/emmeton)
[![build status](https://travis-ci.org/jasonHzq/emmeton.svg)](https://travis-ci.org/jasonHzq/emmeton)
[![npm downloads](https://img.shields.io/npm/dt/emmeton.svg?style=flat-square)](https://www.npmjs.com/package/emmeton)

## install

```sh
$ npm i -g emmeton
```

## Usage

```sh
$ emmeton 'src>{index.js}^test>{index.js}^bin>{app.js}'
```

which will create files as below:

```
.
├── bin
│   └── app.js
├── src
│   └── index.js
└── test
    └── index.js
```

## License

[MIT](http://opensource.org/licenses/MIT)
