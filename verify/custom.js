'use strict'

const realtype = require('realtype')

/**
 * 自定义校验
 * @param {function} verify 自定义校验方法
 * @param {any} value 被校验的内容
 * @param {object} data 整份数据
 */
module.exports = (verify, value, data) => {
  let result = {
    message: []
  }
  const res = verify(value, data)
  if (realtype(res) === 'object') {
    result = res
  }
  if (res === false) {
    result.message.push(`Verification failed.`)
  }
  return result
}
