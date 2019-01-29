'use strict'

/*
* 模拟 SyncBailHook 的实现
* */

class SyncBailHook {
  constructor(options) {
    this.options = options
    this.hooks = []
  }

  tap(name, callback) {
    this.hooks.push(callback)
  }

  call(...args) {
    let hooks = [...this.hooks]
    let i = 0, ret
    do {
      try {
        ret = hooks[i++](...args)
      } catch (e) {
        new Error('确保要有返回值')
      }
    } while (!ret)
  }
}

const bailhook = new SyncBailHook(['name'])

bailhook.tap('sayName', name => {
  console.log(name, 'name')
  return true
})

bailhook.tap('sayMoney', money => {
  console.log(money, 'money')
})

bailhook.call('good')