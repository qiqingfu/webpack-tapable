'use strict'

/*
* AsyncSeriesWaterfallHook 异步串行瀑布式执行, 前一个函数的结果可以传递给后一个函数的参数
* */

class AsyncSeriesWaterfallHook {
  constructor(options) {
    this.options = options
    this.hooks = []
  }

  tapAsync(name, callback) {
    this.hooks.push(callback)
  }

  callAsync(...args) {
    let finalCallback = args.pop()
    let i = 0
    let stated
    const next = (error, data) => {
      let hook = this.hooks[i++]
      if (!hook) return finalCallback()
      if (!stated) {
        // 只让第一次执行
        hook(...args, next)
        stated = true
      } else {
        hook(data, next)
      }
    }
    next()
  }
}

// const seriesWaterfallHook = new AsyncSeriesWaterfallHook(['name'])
//
// seriesWaterfallHook.tapAsync('sayName', (name, cb) => {
//   setTimeout(() => {
//     console.log('sayName', name)
//     cb(null, '这是sayName传递过来的参数')
//   }, 1000)
// })
//
// seriesWaterfallHook.tapAsync('sayMoney', (data, cb) => {
//   setTimeout(() => {
//     console.log('sayMoney', data)
//     cb(null)
//   }, 1000)
// })
//
// seriesWaterfallHook.callAsync('qiqingfu', () => {
//   console.log('end!!!')
// })

module.exports = AsyncSeriesWaterfallHook