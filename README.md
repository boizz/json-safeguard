# json-safeguard

[![Build Status](https://travis-ci.org/BoizZ/json-safeguard.svg?branch=master)](https://travis-ci.org/BoizZ/json-safeguard)
[![npm package](https://img.shields.io/npm/v/json-safeguard.svg?style=flat-square)](https://www.npmjs.org/package/json-safeguard)
[![NPM downloads](http://img.shields.io/npm/dm/json-safeguard.svg?style=flat-square)](https://npmjs.org/package/json-safeguard)
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
  excellent: (val, data) => {
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
    complated_data: {
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
| Boolean | `boolean` | Check if the value of this field is boolean. |
| Number | `number` | Check if the value of this field is number. |
| String | `string` | Check if the value of this field is string. |
| Array | `[]` | Only check if this field is an array. |
| Boolean-Array | `boolean[]` | Check the array field and check if the child node is a boolean. |
| Number-Array | `number[]` | Check the array field and check if the child node is a number. |
| String-Array | `string[]` | Check the array field and check if the child node is a string. |

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
    complated_data: {
      _string_array: []
    }
  }
*/
```

### Custom Verify

| Types | Value | Description |
| :-: | :-: | :-: |
| Custom Verify | (value, data) => any | Use a custom function to check if this field meets the requirements. Return a boolean to tell the result of the check directly. You can also return an object and set the custom message and default value, please read below for details. |

#### Return an object

| Property | Description | Type |
| :-: | :-: | :-: |
| state | Verification state  | boolean |
| message | Error message | string |
| defaultValue | Default value of this field | any |

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
    complated_data: {
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
| complated_data | Complated data | object | {} |

## License

MIT


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FBoizZ%2Fjson-safeguard?ref=badge_large)
