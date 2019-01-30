'use strict'

/*
*   模拟 SyncLoopHook 的简单实现
*   如果订阅的函数返回值为 true, 就重复执行这个函数。执行方式是执行缓存的每一个订阅函数
* */

class SyncLoopHook {
  constructor(options) {
    this.options = options
    this.hooks = []
  }

  tap(name, callback) {
    this.hooks.push(callback)
  }

  call(...args) {
    let ret, i = 0
    for (i; i < this.hooks.length; i++) {
      do {
        ret = this.hooks[i](...args)
      } while (ret === true || ret !== undefined)
    }
  }
}

const loophook = new SyncLoopHook(['name'])

let total1 = 0
let total2 = 0

loophook.tap('sayName', name => {
  console.log('total1', total1)
  return total1++ < 2 ? true : undefined
})

loophook.tap('sayMoney', name => {
  console.log('total2', total2)
  return total2++ < 2 ? true : undefined
})

loophook.call()

/*
total1 0
total1 1
total1 2
total2 0
total2 1
total2 2
*/