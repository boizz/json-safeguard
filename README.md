# json-safeguard

[![Build Status](https://travis-ci.org/BoizZ/json-safeguard.svg?branch=master)](https://travis-ci.org/BoizZ/json-safeguard)
[![npm package](https://img.shields.io/npm/v/json-safeguard.svg?style=flat-square)](https://www.npmjs.org/package/json-safeguard)
[![NPM downloads](http://img.shields.io/npm/dm/json-safeguard.svg?style=flat-square)](https://npmjs.org/package/json-safeguard)
[![Dependency Status](https://david-dm.org/BoizZ/json-safeguard.svg?style=flat-square)](https://david-dm.org/BoizZ/json-safeguard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard?ref=badge_shield)

A lib that effectively safeguards data types, and automatic completion of the required words.

## Quick Start

```bash
npm i --save json-safeguard
```

```js
const safeguard = require('json-safeguard')

const schema = {
  _string: 'string'
}
const data = {
  _string: 123
}

safeguard(schema, data) /** =>
  {
    state: false,
    message: 'TypeError: _string should be string, but now it is number',
    complated_data: {
      _string: 123
    }
  }
*/
```

## API

### Basic Types

Declare the type of field in the Schema to verify the data.

``` js
const schema = {
  _string: 'string'
}
```

 - Boolean: `boolean`
 - Number: `number`
 - String: `string`
 - Array: `[] | boolean[] | number[] | string[]`

### Required and Automatic Completion

You can specify some required fields with `*`, such as `number[]*`. When the field is empty, it will automatically completion.

For example:

``` js
const safeguard = require('json-safeguard')

const schema = {
  _string_array: 'string[]*'
}
const data = {}

safeguard(schema, data) /** =>
  {
    state: false,
    message: 'TypeError: _string should be required',
    complated_data: {
      _string_array: []
    }
  }
*/
```

### Custom Assert

``` js
const safeguard = require('json-safeguard')

const schema = {
  _number: (value) => value < 20
}
const data = {
  _number: 15
}

safeguard(schema, data) /** =>
  {
    state: true,
    message: '',
    complated_data: {
      _string_array: 15
    }
  }
*/
```

## License

MIT


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard?ref=badge_large)
