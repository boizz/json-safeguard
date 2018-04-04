module.exports = {
  _string: 'string*',
  _number: 'number*',
  _boolean: 'boolean*',
  _string_array: 'string[]*',
  _number_array: 'number[]*',
  _array: '[]',
  _sub: {
    _string: (value) => {
      return value === 'abc'
    },
    _number: (value, data) => {
      if (data._boolean) {
        return value > 130
      } else {
        return value < 130
      }
    },
    _boolean: (value) => {
      return {
        message: [],
        defaultValue: true
      }
    }
  },
  _number_2: 'number',
  _array_2: [
    {
      _number: 'number'
    }
  ]
}
