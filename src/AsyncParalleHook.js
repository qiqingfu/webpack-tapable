const {
  AsyncParallelHook
} = require('tapable')

class AsyncLoopen {
  constructor() {
    this.hooks = {
      argv: new AsyncParallelHook(['name'])
    }
  }
  // 订阅异步处理函数
  tapAsync() {
    this.hooks.argv.tapAsync('sayName', (name, done) => {
      setTimeout(() => {
        console.log('sayName, async', name)
        done()
      }, 1000)
    })

    this.hooks.argv.tapAsync('sayMoney', (name, done) => {
      setTimeout(() => {
        console.log('sayMoney, async', name)
        done()
      }, 2000)
    })
  }

  // callAsync 异步并行触发订阅函数
  callAsync() {
    this.hooks.argv.callAsync('qiqingfu', () => {
      console.log('end!!!')
    })
  }
}

const asyncloopen = new AsyncLoopen()
asyncloopen.tapAsync()
asyncloopen.callAsync()