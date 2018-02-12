'use strict'

const realtype = require('realtype')

/**
 * 数据校验
 * @param {any} schemaValue 校验对象
 * @param {any} fieldValue 数据值
 * @param {string[]} errorFields 错误记录
 * @param {string} fieldName 字段名称
 */
const assertValue = (schemaValue, fieldValue, errorFields, fieldName) => {
  const typeEnum = {
    boolean: false,
    number: 0,
    string: '',
    array: [],
    object: {}
  }
  const schemaType = realtype(schemaValue)
  if (schemaType === 'function') { // 自定义校验规则
    if (!schemaValue(fieldValue)) {
      errorFields.push(`TypeError: ${fieldName} error`)
    }
  } else if (schemaType === 'string') { // 普通校验规则
    const valueType = realtype(fieldValue)

    const typeRx = /boolean|number|string/
    const arrayRx = /\[\]/
    const requiredRx = /\*/

    const isArr = arrayRx.test(schemaValue)

    let basicType = typeRx.exec(schemaValue)
    basicType = basicType && basicType[0]

    let isRequired = requiredRx.exec(schemaValue)
    isRequired = isRequired && isRequired[0]

    if (isRequired && valueType === 'undefined') {
      if (isArr) {
        fieldValue = []
      } else {
        fieldValue = typeEnum[basicType]
      }
      errorFields.push(`TypeError: ${fieldName} should be required`)
    } else if (valueType !== 'undefined') {
      if (isArr) { // 校验数组类型
        // 如果字段非数组
        if (valueType !== 'array') {
          errorFields.push(`TypeError: ${fieldName} should be a array, but ${valueType}`)
        } else { // 如果是数组，校验子节点
          if (!fieldValue.every(item => realtype(item) === basicType)) {
            errorFields.push(`TypeError: ${fieldName} child should be a ${basicType}, but ${valueType}`)
          }
        }
      } else if (valueType !== basicType) { // 校验普通类型
        errorFields.push(`TypeError: ${fieldName} should be a ${basicType}, but ${valueType}`)
      }
    }
  } else if (schemaType === 'array' || schemaType === 'object') { // 遍历子节点
    for (let key in schemaValue) {
      fieldValue = fieldValue || typeEnum[schemaType]
      fieldValue[key] = assertValue(schemaValue[key], fieldValue[key], errorFields, key)
    }
  }
  return fieldValue
}

/**
 * JSON 数据校验
 * something description
 * @param {Object} schema 文档
 * @param {Object} data 数据
 * @return {Object}
 */
module.exports = (schema, data) => {
  const errorFields = []
  const res = assertValue(schema, data, errorFields, false)
  const body = {}
  body.complated_data = res
  if (errorFields.length) {
    body.state = false
    body.message = errorFields.join(', ')
  } else {
    body.state = true
    body.message = 'Verification passed'
  }
  return body
}
