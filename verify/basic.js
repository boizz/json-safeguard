'use strict'

const realtype = require('realtype')

/**
 * 基础类型校验
 * @param {any} schema 文档
 * @param {any} value 数据
 */
module.exports = (schema, value) => {
  const result = {
    message: []
  }

  const regexr = {
    basic: /boolean|number|string/,
    array: /\[\]\*{0,1}$/,
    required: /\*$/
  }

  // 检查 value 类型
  const valueType = realtype(value)
  const isValueUndefined = valueType === 'undefined'

  // 检查 schema 声明
  let basicType = regexr.basic.exec(schema)
  basicType = basicType && basicType[0]
  const isArray = regexr.array.test(schema)
  const isRequired = regexr.required.test(schema)

  if (isValueUndefined) {
    if (isRequired) {
      result.message.push(`Expected a value is required.`)

      // 填写默认值
      if (isArray) {
        result.defaultValue = []
      }
    }
  } else {
    // 如果是数组
    if (isArray) {
      if (valueType !== 'array') {
        result.message.push(`Expected a value of type "array" but received \`${JSON.stringify(value)}\`.`)
      } else {
        if (basicType) {
          value.forEach(item => {
            const itemType = realtype(item)
            if (basicType !== itemType) {
              result.message.push(`Expected a value of type "${basicType}" but received \`${item}\`.`)
            }
          })
        }
      }
    } else {
      // 校验
      if (basicType !== valueType) {
        result.message.push(`Expected a value of type "${basicType}" but received \`${JSON.stringify(value)}\`.`)
      }
    }
  }

  return result
}
