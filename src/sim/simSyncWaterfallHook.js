'use strict'

// 简单模拟 tapable SyncWaterfallHook的实现

class SyncWaterfallHook {
  constructor(options) {
    this.options = options
    this.hooks = []  // 缓存订阅的事件
  }

  /**
   * 订阅事件
   * @param name
   * @param callback
   */
  tap(name, callback) {
    this.hooks.push(callback)
  }

  /**
   * 发布事件
   * @param args
   */
  call(...args) {
    let [first, ...hooks] = this.hooks
    if (first) {
      return hooks.reduce((i, n) => n(i), first(...args))
    }
  }
}

const waterfallHook = new SyncWaterfallHook(['name'])

waterfallHook.tap('sayName', name => {
  console.log(name)
  return 'sayName 函数的返回值'
})

waterfallHook.tap('sayMoney', money => {
  console.log(money)
})

waterfallHook.call('good')