module.exports = {
  _string: 'string*',
  _number: 'number*',
  _boolean: 'boolean*',
  _string_array: 'string[]*',
  _number_array: 'number[]*',
  _sub: {
    _string: (value) => {
      return value === 'abc'
    },
    _number: (value) => {
      return value < 130
    },
    _boolean: (value) => {
      return value
    }
  },
  _auto_complation: {
    _sub_1: {
      _number_array: 'number[]*'
    },
    _string: 'string*',
    _number: 'number*',
    _boolean: 'boolean*'
  }
}
