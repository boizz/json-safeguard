'use strict'

const expect = require('chai').expect
const data = require('./demo_data.json')
const allRight = require('./schema_all_right')
const autoComplation = require('./schema_auto_complation')
const somethingError = require('./schema_something_error')

const assert = require('../index')

describe('JSON 校验', () => {
  const autoComplationRes = assert(autoComplation, data, true)

  it('字段丢失应该报出错误', () => {
    expect(autoComplationRes.state).to.be.equal(false)
  })

  it('可以自动补全必填数组类型', () => {
    expect(JSON.stringify(autoComplationRes.complated_data._auto_complation._sub_1._number_array)).to.be.equal('[]')
  })

  it('自动补全不会影响其他信息', () => {
    expect(autoComplationRes.complated_data._auto_complation._sub_2).to.be.equal('abc')
  })

  it('所有字段应该校验通过', () => {
    const res = assert(allRight, data)
    expect(res.state).to.be.equal(true)
  })

  it('应该能够检验出错误', () => {
    const res = assert(somethingError, data)
    expect(res.state).to.be.equal(false)
  })

  it('传入的数据为其他类型应该是安全的', () => {
    const res = assert(allRight, 'abcde')
    expect(res.state).to.be.equal(false)
  })

  it('不传入数据应该是安全的', () => {
    const res = assert(allRight)
    expect(res.state).to.be.equal(false)
  })
})
