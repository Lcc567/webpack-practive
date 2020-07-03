## package.json 中 script 命令

- webpack --config webpack.config.js
  - 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。


## 多个chunk相互如何引用
```
 webpack 配置
 entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
```

```
js代码
import printMe from './print'

function component() {
    let element = document.createElement('div')
    let button = document.createElement('button')
    button.innerHTML = '点我'
    button.onclick = printMe;
    element.appendChild(button)
    return element
}
document.body.appendChild(component())
```
```
webpack 打包之后
var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ \"./src/print.js\");

button.onclick = _print__WEBPACK_IMPORTED_MODULE_1__[\"default\"];
```
首先声明一个变量，指向文件，使用引用的地方，直接使用当前定义的变量代替


## 使用source map可以解决，多个文件打包到一个文件后，无法精确找到报错文件的问题
 - devtool的不同值




## webpack一些小坑
  - webpack --watch
    - 如果在html-webpack-plugin里面指定了template, 那webpack --watch只会在第一次执行的时候，会将index.html打包到dist文件里，而且在使用了clean-webpack-plugin的同事，修改文件重新打包之后，dist文件中的index.html文件会被删除
  - webpack-dev-server  --port=6666 --open
    - 由于6666-6669这几个端口存在安全问题，禁止访问这几个端口，网页上显示  ![](./src/images/6666.png) 
    - 相关链接  https://www.cnblogs.com/solaZhan/p/8761287.html