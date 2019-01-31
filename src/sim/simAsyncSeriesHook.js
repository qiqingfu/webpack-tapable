/**
 *  AsyncSeriesHook 异步串行执行, 订阅函数: tapAsync tapPromise  发布函数: callAsync promise
 */

'use strict'

class AsyncSeriesHook {
  constructor(options) {
    if (Array.isArray(options)) {
      this.options = options
    } else {
      new Error(`${options} 应该是一个数组类型的参数`)
    }
    this.asyncHooks = []
    this.asyncIndex = 0
    this.asyncCb = null
    this.promiseHook = []
  }

  tapASync(name, callback) {
    this.asyncHooks.push(callback)
  }

  async callAsync(...args) {
    if (args.length >= 1) {
      this.asyncCb = args.pop()
      console.log(this.asyncCb)
      if (typeof this.asyncCb !== 'function') {
        throw new Error('callAsync 最后一个参数应该是一个回调函数')
      }
    }
    for (let hook of this.asyncHooks) {
      await hook(...args, this.done.bind(this))
    }
  }

  done() {
    if (this.asyncIndex++ === this.asyncHooks.length) {
      this.asyncCb()
    }
  }

  // promise 异步串行
  tapPromise(name, callback) {
    this.promiseHook.push(callback)
  }

  async promise(...args) {
    let hooks = []
    for (let hook of this.promiseHook) {
      hooks.push(await hook(...args))
    }
    return Promise.all(hooks)
  }
}

module.exports = AsyncSeriesHook