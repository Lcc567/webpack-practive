## package.json 中 script 命令

- webpack --config webpack.config.js
  - 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。

## 多个 chunk 相互如何引用

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

## 使用 source map 可以解决，多个文件打包到一个文件后，无法精确找到报错文件的问题

- devtool 的不同值

## webpack 怎么区 development 还是 production

- process.env.NODE_ENV 的值可以在 webpack 配置文件和代码中获取
- webpack -p 或者 cross-env NODE_ENV=production 可以在 webpack 中的 process.env.NODE_ENV 的值
- 代码中 process.env.NODE_ENV 的值默认为 production，可以在配置文件中指定 mode:development，<font color=#0099ff>或者说，代码中的 process.env.NODE_ENV 只和 mode 有关（我的理解）</font>
- 记住，只设置 NODE_ENV，则不会自动设置 mode
- mode 如果不设置，webpack 会默认按照 mode: production 处理，production 会将 process.env.NODE_ENV 的值设为 production，

## webpack 一些小坑

- webpack --watch
  - 如果在 html-webpack-plugin 里面指定了 template, 那 webpack --watch 只会在第一次执行的时候，会将 index.html 打包到 dist 文件里，而且在使用了 clean-webpack-plugin 的同事，修改文件重新打包之后，dist 文件中的 index.html 文件会被删除
- webpack-dev-server --port=6666 --open

  - 由于 6666-6669 这几个端口存在安全问题，禁止访问这几个端口，网页上显示 ![](./src/images/6666.png)
  - 相关链接 https://www.cnblogs.com/solaZhan/p/8761287.html

- 'webpack' 不是内部或外部命令，也不是可运行的程序或批处理文件。

  - ![](./src/images/webpack-error.png)
  - 此时重新单独安装一下 webpage 和 webpack-cli cnpm install webpack webpack-dev-server webpack-cli --save-dev

- Unexpected token: name «element», expected: punc «;» [app.bundle.js:109,8]
  - https://chen-cong.blog.csdn.net/article/details/103254670
