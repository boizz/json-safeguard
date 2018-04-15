# json-safeguard

[![Build Status](https://travis-ci.org/BoizZ/json-safeguard.svg?branch=master)](https://travis-ci.org/BoizZ/json-safeguard)
[![Coverage Status](https://coveralls.io/repos/github/BoizZ/json-safeguard/badge.svg)](https://coveralls.io/github/BoizZ/json-safeguard)
[![NPM Package](https://img.shields.io/npm/v/json-safeguard.svg?style=flat-square)](https://www.npmjs.org/package/json-safeguard)
[![NPM Downloads](https://img.shields.io/npm/dm/json-safeguard.svg?style=flat-square)](https://npmjs.org/package/json-safeguard)
[![Dependency Status](https://david-dm.org/BoizZ/json-safeguard.svg?style=flat-square)](https://david-dm.org/BoizZ/json-safeguard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard?ref=badge_shield)

A lib that effectively safeguards data types, and automatic completion of the required words.

## Quick Start

```bash
$ npm i --save json-safeguard
```

```js
const safeguard = require('json-safeguard')

const schema = {
  name: 'string'
}
const data = {
  name: 'Heleth'
}

safeguard(schema, data) /** =>
  {
    state: true,
    message: 'Verification passed',
    complated_data: {
      name: 'Heleth'
    }
  }
*/
```

## More complicated verification

```js
const schema = {
  name: 'string*',
  age: 'number',
  excellent: (value, data) => {
    const subjects = data.subjects || []
    const isExcellent = subjects.every(item => item.achievement >= 90)
    return isExcellent === value ? true : {
      state: false,
      messages: [
        `${data.name} is ${isExcellent ? '' : 'n\'t'} excellent`
      ]
    }
  },
  subjects: [
    {
      name: 'string*',
      achievement: 'number*'
    }
  ],
  hobby: 'string[]*'
}

const data = {
  name: 'Heleth',
  age: 23,
  excellent: false,
  subjects: [
    {
      name: 'Javascript',
      achievement: 95.5
    },
    {
      name: 'Python',
      achievement: 90
    },
    {
      name: 'Swift',
      achievement: 93
    }
  ]
}

safeguard(schema, data) /** =>
  {
    state: false,
    message: 'Heleth is excellent. | hobby: Expected a value is required.',
    completed_data: {
      name: 'Heleth',
      age: 23,
      excellent: false,
      subjects: [
        {
          name: 'Javascript',
          achievement: 95.5
        },
        {
          name: 'Python',
          achievement: 90
        },
        {
          name: 'Swift',
          achievement: 93
        }
      ]
    },
    hobby: []
  }
*/

```

## Schema

### Basic Types

Declare the type of field in the Schema to verify the data.

``` js
const schema = {
  _string: 'string'
}
```

| Types | Value | Description |
| :-: | :-: | :-: |
| Boolean | `boolean` | True or false. |
| Number | `number` | Integer or float. |
| String | `string` |  |
| Array | `[]` | Array of any. |
| Boolean-Array | `boolean[]` | Array of boolean only. |
| Number-Array | `number[]` | Array of number only. |
| String-Array | `string[]` | Array of string only. |

### Required and Automatic Completion

You can specify some required fields with `*`, such as `number[]*`. When the field is empty, it will automatically completion.

| Types | Value | Description |
| :-: | :-: | :-: |
| Required | `*` | Check if this field exists. |

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
    message: '_string_array: Expected a value is required.',
    completed_data: {
      _string_array: []
    }
  }
*/
```

### Custom Verify

| Types | Value | Description |
| :-: | :-: | :-: |
| Custom Verify | (value, data) => any | Use a custom function to check if this field meets the requirements. Return a boolean to tell the result of the check directly. You can also return an object and set the custom message and default value, please read below for details. |

``` js
const safeguard = require('json-safeguard')

const schema = {
  _number: (value, data) => value < 20
}
const data = {
  _number: 15
}

safeguard(schema, data) /** =>
  {
    state: true,
    message: '',
    completed_data: {
      _string_array: 15
    }
  }
*/
```

## Result

| Property | Description | Type | Default |
| :-: | :-: | :-: | :-: |
| state | Verification state | boolean | - |
| message | Error message | string | '' |
| completed_data | Safe data containing required arrays and objects | object | {} |

## License

MIT


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard?ref=badge_large)
