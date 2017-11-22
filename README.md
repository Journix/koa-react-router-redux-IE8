# koa-react-router-redux 完美兼容 IE8 实战

ps：详细目录结构及启动命令直接拉到最后

## 各版本选择
- react : 只能选择0.14 版本，这里为了更好的兼容性， 选择了 0.14.9，相对应的 react-dom 同样选择 0.14.9
- react-router : v4只能兼容 react 15 及以上的版本，我们这里是新项目，所以选择稳定性最高的 v3，这里路由不要选择版本过于低的版本

## package.json npm 兼容模块
- es3ify-loader: 解决 es3 环境下的兼容，有了这个， transform-es3-property-literals, transform-es3-member-expression-literal, add-module-exports就没有必要了
- es3ify-webpack-plugin
- es5-shim: IE8是es3,需要引入 es5 polyfill
- babel-polyfill: 解决各类api
- core-js: 解决 object.assign 等
- transform-runtime
- transform-es3-property-literals: 保证在对象属性中的保留字正确
- transform-es3-member-expression-literals: 保证在对象属性访问中的保留字正确，也会把export.default转为export[“default”]，即解决了default不兼容的问题
- babel-core
- babel-loader
- babel-plugin-add-module-exports
- babel-plugin-transform-es3-member-expression-literals
- babel-plugin-transform-es3-property-literals
- babel-plugin-transform-runtime: 供编译模块复用工具函数，减小编译后代码的体积。
- babel-preset-env
- babel-preset-es2015
- babel-preset-es2015-loose
- babel-preset-react
- babel-preset-stage-0
- export-from-ie8
ps: 目前引入的模块较多，可根据需要删减

## 遇到的问题

### assign 无法识别
解决方案： `require (core-js/fn/object/assign)`

### forEach 无法识别
.babelrc
```javascript
{
  "presets": [
    [
      "es2015",
      {
        "loose": true
      }
    ],
    "react",
    "stage-0"
  ],
  "plugins": [
    [
      "transform-runtime",
      {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
      }
    ],
    "transform-es3-property-literals",
    "transform-es3-member-expression-literals"
  ]
}
```

webpack.config.js
```javascript
module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        'plugins': [
          ['transform-runtime', {
            'helpers': false,
            'polyfill': false,
            'regenerator': true,
            'moduleName': 'babel-runtime'
          }],
          'transform-es3-property-literals',
          'transform-es3-member-expression-literals'
        ],
        'presets': [
          ['es2015',
            {
              'loose': true,
              // 'modules': false
            }
          ],
          'react',
          'stage-0'
        ]
      }
    }],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: [
          'export-from-ie8/loader'
        ]
      }
    ]
  }
  ```

更改入口文件位置，在入口文件（这里是index.js）中不写react代码，新增另一个文件（这里为app.js），把原来的入口文件代码写入（各种兼容保留在index.js中），最后引入新增的文件

### IE各模式问题
`<meta http-equiv="X-UA-Compatible" content="IE=edge">`

确保IE以当前浏览器的最高模式渲染页面

### 解决node_modules中的代码兼容性问题，兼容ie8需要把node_modules中的代码同样打包
解决方案： 引入插件 `es3ify-webpack-plugin`

## 目录结构
- frontEnd : 前端react项目
  - cfg: 各环境配置
  - dist: 编译后的文件目录
  - src: react 项目源码
- src : koa 源码
  - ctrls: 路由配置
  - middlewares: 路由中间件
  - router.js: 路由入口文件

## 参考文件/博客/网址（感谢）
- https://github.com/xcatliu/react-ie8
- http://blog.csdn.net/deng_gene/article/details/53004735
- https://github.com/xcatliu/react-ie8/issues/22
- https://segmentfault.com/q/1010000005889716/a-1020000009508746


## node层

### package.json
- babel-cli: 命令行转码，自带babel-node，提供一个支持ES6的REPL环境。可以直接运行 es6 脚本。
- babel-register: 改写 require 名字，require时，先进行 babel 转码。由于是实时转码，只适合在开发环境中使用。
