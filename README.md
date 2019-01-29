## webpack-tapable  

Webpack 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是 tapable ，Webpack 中最核心的，负责编译的 Compiler 和负责创建 bundles 的 Compilation 都是 tapable 构造函数的实例。 

```javascript
	- src
		- sim  	 ---- 简单的模拟实现
		- /.js$/ ---- 使用
``` 

