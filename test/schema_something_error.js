module.exports = {
  _string: 'number',
  _number: 'number[]*',
  _boolean: 'boolean*',
  _string_array: 'number[]*',
  _number_array: 'number[]*',
  _sub: {
    _string: (value) => {
      return value !== 'abc'
    },
    _number: (value) => {
      return value > 130
    },
    _boolean: (value) => {
      return !value
    },
    _string_array: 'string[]*',
    _sub_2: [
      {
        _number_array: 'number[]'
      }
    ]
  }
}
