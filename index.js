'use strict'

const realtype = require('realtype')
const basicVerify = require('./verify/basic')
const customVerify = require('./verify/custom')

/**
 * JSON 数据校验
 * something description
 * @param {Object} schema 文档
 * @param {Object} data 数据
 * @return {Object}
 */
module.exports = (schema, data) => {
  const errorMessages = []

  /**
   * 数据校验
   * @param {any} schema 文档
   * @param {any} value 要校验的值
   * @param {string} path 路径
   * @param {object} data 数据
   */
  const assert = (schema, value, data, path = '') => {
    if (path === '') {
      try {
        value = JSON.parse(JSON.stringify(value))
      } catch (e) {
        errorMessages.push('Expected data of type "object"')
        return {}
      }
    }

    const schemaType = realtype(schema)
    let res

    switch (schemaType) {
      case 'string':
        res = basicVerify(schema, value)
        break
      case 'function':
        res = customVerify(schema, value, data)
        break
      default :
        const valueType = realtype(value)
        if (schemaType === 'array') {
          value = valueType === 'array' ? value : []
          schema.forEach((item, key) => {
            const currentPath = `${path}[${key}]`
            value[key] = assert(schema[key], value[key], data, currentPath)
          })
        } else {
          value = valueType === 'object' ? value : {}
          for (let key in schema) {
            const currentPath = `${path ? `${path}.` : ''}${key}`
            value[key] = assert(schema[key], value[key], data, currentPath)
          }
        }
    }

    if (schemaType === 'string' || schemaType === 'function') {
      value = realtype(value) === 'undefined' ? res.defaultValue : value
      res.message.forEach(message => {
        errorMessages.push(`${path}: ${message}`)
      })
    }

    return value
  }

  const res = assert(schema, data, data)
  const body = {}
  body.complated_data = res

  if (errorMessages.length) {
    body.state = false
    body.message = errorMessages.join(' | ')
  } else {
    body.state = true
    body.message = 'Verification passed'
  }
  return body
}
