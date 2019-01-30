'use strict' 

/**
 * 模拟 AsyncParalleHook 的实现
 * 订阅: tapAsync
 * 发布: callAsync
 */

 class AsyncParalleHook {
    constructor(options) {
      this.options = options
      this.cb = null
      this.AsyncHooks = []
      this.doneIndex = 0
    }

    tapAsync(name, callback) {
      this.AsyncHooks.push(callback)
    }

    callAsync(...args) {
      if (args.length >= 1) {
        this.cb = args.pop()
        if (typeof this.cb !== 'function') {
          new Error('callAsync 最后一个参数不是函数')
          return
        }
      }

      // 注意 this.done内部的 this一定要指向实例对象
      this.AsyncHooks.forEach(hook => hook(...args, this.done.bind(this)))
    }

    done() {
      this.doneIndex++
      if (this.doneIndex === this.AsyncHooks.length) {
        this.cb()
      }
    }
 }

 let paralleHook = new AsyncParalleHook('name')
 paralleHook.tapAsync('sayName', (name, done) => {
  setTimeout(() => {
    console.log('sayName async', name)
    done()
  }, 1000)
 })

 paralleHook.tapAsync('sayMoney', (name, done) => {
  setTimeout(() => {
    console.log('sayMoney async', name)
    done()
  }, 3000)
 })

 paralleHook.callAsync('qiqingfu', () => {
   console.log('end!!!!')
 })