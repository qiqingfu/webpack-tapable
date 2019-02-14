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

// module.exports = SyncLoopHook

const syncLoopHook = new SyncLoopHook('name')

let n1 = 0
let n2 = 0
syncLoopHook.tap('name', data => {
  console.log('name', data)
	return n1++ < 2 ? true : undefined
})
syncLoopHook.tap('end', data => {
	console.log('end', data)
})

syncLoopHook.call('qiqingfu')