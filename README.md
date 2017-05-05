antd-game-admin
===============

antd重构现有的游戏管理后台

> 基于现有的脚手架开发 [react-starter-kit](https://github.com/songzhengxu/react-starter-kit)

---

快速开始
--------

```
$ git clone https://github.com/songzhengxu/antd-game-admin
$ cd react-starter-kit
$ npm install
```

#### 2.1 开发调试

```
//启动项目
$ npm run dev
```

将自动打开浏览器`http://127.0.0.1:3000`

#### 2.2 代码检查

```
$ 编译和打包都会自动运行代码检查
  也可以配置编辑器,在编码时实时检查语法 如: atom需要安装linter和linter-eslint这两个插件, 装好后重启生效.
```

#### 2.3 测试用例

```
$ npm run test 				// 运行单元测试
$ npm run coverage 		// 运行覆盖率测试
```

> 单元测试在控制台输出报告，覆盖率测试将在项目根目录中创建coverage文件夹来输出测试报告， 进入coverage/lcov-report 中，打开index.html 能够在浏览器中查看更加详细的覆盖率测试报告

#### 2.4 产出资源

```
$ npm run build
```

导出的代码在项目根目录中

---

目录结构
--------

```
react-starter-kit/
├─src                 // 源文件目录
│  ├─Action     
│  ├─Assets           // 图片资源
│  ├─Component
│  │  └─Common
│  ├─Config
│  ├─Iconfont         // 字体
│  ├─Reducer
│  ├─Style
│  ├─Template         // html模板
│  └─utils
└─test                // 测试用例目录
    ├─Action
    ├─Component
    └─Reducer
```

---

技术栈
------

1.	[x] [Webpack](https://webpack.github.io)
2.	[x] [React](https://facebook.github.io/react/)
3.	[x] [ES6](http://es6.ruanyifeng.com/)
4.	[x] [Redux](https://github.com/rackt/redux)
5.	[x] [React-router](https://github.com/rackt/react-router-redux)
6.	[x] [Babel](https://babeljs.io/)
7.	[x] [Autoprefixer](https://github.com/postcss/autoprefixer)
8.	[x] [PostCSS](https://github.com/postcss/postcss)
9.	[x] [CSS modules](https://github.com/outpunk/postcss-modules)
10.	[x] [Less](https://github.com/less/less.js)
11.	[x] [Eslint](https://github.com/eslint/eslint)
