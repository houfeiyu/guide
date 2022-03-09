# 介绍

vue-project-tmplate 是个 vue 模板项目。它由 vue-cli3 脚手架搭建而来，对开发规范进行了相关定义，并集成了一些常用的 vue 插件以及相关配置项，让 vue 开发变得规范简洁。包含的功能如下：

-   目录结构的规范和定义
-   规范化组件开发示例
-   [eslint](https://eslint.org/) + [prettier](https://prettier.io/) 代码规范管理的集成
-   [vue-router](https://router.vuejs.org/zh/) 路由和使用示例
-   [vuex](https://vuex.vuejs.org/zh/) 状态管理器和使用示例
-   [iviewUI](https://iviewui.com/docs/introduce) 的集成
-   [Less](http://lesscss.cn/) 组件化样式开发示例
-   其他常用工具类的集成等

# 开始

## 目录结构

-   目录结构如下：

```
.
├── vue.config.js
├── package.json
├── packages
│   └── markdown-loader.js
├── public
│   ├── images
│   ├── lib
│   ├── config
│   │   ├── application.js
│   │   ├── application.dev.js
│   │   └── application.prod.js
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   ├── styles
│   │   │   ├── custom.less
│   │   │   └── iview.less
│   │   └── img
│   │       └── logo.png
│   ├── plugins
│   │   ├── comp-manager
│   │   │   ├── index.js
│   │   │   ├── Delete.vue
│   │   │   └── Confirm.vue
│   │   ├── axios.js
│   │   └── iview.js
│   ├── store
│   ├── router
│   │   ├── page.js
│   │   ├── home.js
│   │   ├── error.js
│   │   └── index.js
│   ├── utils
│   │   ├── application.js
│   │   ├── http.js
│   │   └── misc.js
│   ├── components
│   ├── layouts
│   │   ├── includes
│   │   │   ├── Aside.vue
│   │   │   ├── Header.vue
│   │   │   ├── Nav.vue
│   │   │   └── Footer.vue
│   │   ├── Default.vue
│   │   ├── Page.vue
│   │   └── Error.vue
│   ├── views
│   │   ├── Api.md
│   │   ├── Guide.md
│   │   └── Main.vue
│   ├── main.js
│   └── App.vue
├── babel.config.js
└── README.md
```

-   来看看这些都有什么用：

|   文件/目录   | 描述                                                                                                                                            |
| :-----------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|   packages    | 没有发布到 npm 上的私有包                                                                                                                       |
|    public     | 外部静态文件目录，包含一个主页 index.html，外部 js 库文件 lib 目录，不需要通过 less 或者 vue 引用的 images 文件夹，以及外部配置文件夹 config 等 |
|      src      | 源码路径，进行开发工作的文件目录                                                                                                                |
| vue.config.js | vue 项目配置文件                                                                                                                                |
| package.json  | node 项目配置文件，包含常用的引用等                                                                                                             |

-   src 源码目录：

| 文件/目录  | 描述                                                                  |
| :--------: | --------------------------------------------------------------------- |
|   assets   | 静态资源目录，需要通过模块引用的，包含一个 img 图片和 styles 样式目录 |
|  plugins   | vue 相关技术集成目录，如 iviewUI 框架，axios 以及一些自定义插件等     |
|   router   | 路由配置目录                                                          |
|   store    | vuex 状态仓库目录                                                     |
|   utils    | 公用 js 工具目录                                                      |
| components | 公共组件目录，这里组件应该都是没有任何业务关联的                      |
|  layouts   | 布局组件目录，规定界面的相关布局效果                                  |
|   views    | 业务组件目录，这里是主要业务系统开发的文件路径                        |
|  App.vue   | 初始化组件，这里会进行相关配置项的读取操作                            |

## 默认配置

默认配置集成了一些开发常用的配置，主要包括以下部分：

-   打包后的文件采用相对路径并关闭文件后缀名 hash
-   css，less 新增配置项
-   其他常用的配置

> _注意：插件集成的配置可以在 plugins 目录下查看源文件_

```js
[import]: vue.config.js
```

## 运行流程

### webpack 运行逻辑：

1. 读取配置项，即 vue.config.js 文件
2. 从主入口开始读取文件，默认为 main.js
3. 分析相关依赖，对不同的文件选用不同的 loader 进行处理
4. webpack 输出编译后的文件到 output 指定的目录，默认为 dist
5. 相关静态文件处理插件运行，如为 html 模板绑定指定的 title 和添加 js 引用

### vue-project-template 渲染流程和标准 vue 项目渲染流程一致，只是新增了配置项的读取：

1. 打开浏览器，main.js 运行，进行相关 vue 插件项的初始化

```js
[import]: src/main.js
```

2. App.vue 读取外部配置，并绑定 CONFIG 对象（可选），初始化完毕

```vue
[import]: src/App.vue
```

3. 渲染匹配的路由界面，渲染指定的 layout 和界面

```vue
[import]: src/layouts/Default.vue
```

4. 界面渲染完毕

# 编码风格规范

vue-project-template 内部集成了 `eslint + prettier`

`eslint` 用来控制语法规则，不合规则的语法将不会通过编译  
`prettier` 是一个代码格式化工具，用来统一代码开发风格；同样的，不符合 perttier 风格的写法不会通过编译

通过运行 `npm lint` 可以修复简单的不合规范的写法，并提示出相关代码错误  
如果使用 vscode 开发工具，建议安装 eslint 和 prettier 插件，这样就可以直观在开发界面显示错误

> _如果是 vscode 编译器，在配置项中添加以下选项，就可以在保存文件的时候自动修复代码_

```json
  "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true,
    // For TSLint
    "source.fixAll.tslint": true,
    // For Stylelint
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
```

## 命名规范

-   **_文件夹_**

    -   对外输出的文件夹（内部存在一个 index.js 文件）统一采用以下命名，例：_`theme-api`_
    -   模块文件夹内部命名，可以根据喜好决定自己的命名风格

-   **_js 文件_**

    -   文件命名，一般工具集，例： _`miscUtil.js`_
    -   文件命名，类文件，例：_`Layer.js`_
    -   外部常量命名，例：_`const __VERSION_NUMBER__ = 1.00`_
    -   局部常量命名，例：_`const VERSION_NUMBER = 1.00`_ 或<br /> _`const VersionNumber = 1.00`_ 或<br /> _`const versionNumber = 1.00`_
    -   局部变量，例：_`let variableValue = 1.00;`_
    -   方法命名，例：_`function deepCopy() {}`_

-   **_vue 文件_**

    -   文件命名，例 _`MyButton.vue`_
    -   其他规范，请看**组件的定义和使用**

-   **_less，css 等样式文件_**
    -   文件命名，例 _`my-button.less`_
    -   id class 等命名，例 _`class = 'my-button'`_
    -   变量命名，例 _`@base-url: '~@/assets/';`_
    -   方法命名，例 _`@mix-style(@url) { }`_

> 命名规范目前没有良好的工具进行校验，只有通过各位的坚持  
> _形成良好的命名规范，可以让代码更加具有辨识性，更好维护，还有很多好处等待各位自己发掘_

## 组件定义和使用

-   **组件的编写顺序**

vue 生命周期如下：编写 vue 组件的时候，建议参照 vue 的生命周期顺序进行代码编写，建议顺序如下

-   `name，mixin，components` 等静态配置项
-   `provide，store` 等对子组件提供数据的配置项
-   `props，inject，data，computed，watch`等数据源，参考顺序为从<br />`[外部数据] --> [内] --> [计算属性] --> [数据监视]`
-   `beforeCreate --> created --> beforeMount --> mounted --> beforeUpdate --> updated --> beforeDestroy --> destroyed`生命周期方法编写
-   `methods`方法和接口的编写

![vue生命周期](@/assets/img/lifecycle.png)

```vue
[import]: src/components/CompDemo.vue
```

-   **事件-属性-接口的定义和使用**

对于一个 html 标签，使用场景一般如下：

-   `<img src = 'imgUrl.png' onclick="onClickHandler"/>`
-   `document.querySelector('img').click()`

这里 `src` 为 img 标签的属性，`onclick`为标签的事件绑定，`click()`为接口的显示调用

> _同理，对于一个标准的 vue 组件，对外暴露的也是这三类用法，代码示例：_

```vue
[import]: src/components/ListDemo.vue
```

-   **样式的编写和命名**

vue 提供了一个 `scope` 标签来来进行样式的编写，这是一个能快捷的开发 vue 组件且不用考虑 class 命名的方式  
但是在实际使用过程中，scope 写法存在以下的问题：

1.  内部存在 ui 组件样式的重写的时候，当前组件的 scope 标签是不能查询到子组件的，这时候样式重写会失效
2.  存在 `deep` 标签的`~~~`的时候，样式的作用域就变得不可控
3.  组件类名命名会变得混乱，可能出现意想不到的样式交叉影响

> _为了避免上述情况，我们推荐使用 less，sass 等模块化组件编写语言， 代码示例：_

```vue
[import]: src/components/StyleDemo.vue
```

-   **标签的使用**

之前我们告诉大家，组件命名统一为大写开头命名，现在我告诉各位原因  
在进行组件开发的时候，一般存在 3 类标签：

1.  html 标签，如 `div，span`（全小写）
2.  第三方插件标签，如`router-link，router-vue`（有统一的前缀，iviewUI 采用 `i-` 开头同理）
3.  自定义组件标签，采用`MyButton`写法

> _代码示例：_

```html
<template>
    <!-- 通过命名，就可以很直观的知道组件的来源 -->

    <header>
        <!-- logo组件，这里是vue-router提供的组件 -->
        <router-link to="/" id="logo">
            <img src="@/assets/img/logo.png" alt="vue logo" />
            <span>vue-project-template</span>
        </router-link>
        <!-- 导航栏组件，自定义组件 -->
        <MyNav />
    </header>
</template>
```

## 编程风格

推荐使用 [es6](https://es6.ruanyifeng.com/) 语法进行开发  
项目内置的语法检测为 [eslint-plugin-vue](https://eslint.vuejs.org/rules/) 默认推荐  
并新增了以下规定：

-   禁用`var`声明变量，变量声明请用`let`或`const`
-   js 变量命名建议为`camelcase`风格，`active_index`这种声明方法将会进行警告
-   `debugger，console`会进行警告，调试完模块后请删除相关 debugger 代码

> _下面简单对常用的 es6 语法进行讲解：_

-   变量声明和赋值

```js
/**
 * var 作用域为 function 内部
 * let，const 为块级作用域 {}
 *
 * let，const提供更严格的作用域控制，所以禁用var
 */

// 对象析构赋值，指定默认值
let { foo, bar, car = 'ccc' } = { foo: 'aaa', bar: 'bbb' };
foo; // "aaa"
bar; // "bbb"
less; // "ccc"

// 同样可以作用于数组
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

/********** rest关键字 ... **********/

// 替代之前的arguments，且更加强大
let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

// 也可以作用于对象
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

-   **对象的使用**

```js
// 对象的简易赋值
const foo = 'bar';
const baz = { foo };
baz; // { foo: "bar" }

// 等同于
const baz = { foo: foo };

// 函数也是个对象，也支持以下写法
const o = {
    method() {
        return 'Hello!';
    },
};

// 等同于

const o = {
    method: function () {
        return 'Hello!';
    },
};
```

-   **函数的使用**

```js
// 使用析构赋值
function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello'); // Hello World
log('Hello', 'China'); // Hello China
log('Hello', ''); // Hello

// 使用rest获取值，注意rest只能放在最后，否则会报错
function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3);

// 箭头函数（推荐掌握），更多的请查看 es6 语法规则

// 正常函数写法
[1, 2, 3].map(function (x) {
    return x * x;
});

// 箭头函数写法
[1, 2, 3].map(x => x * x);
```

-   **类的声明和使用**

```js
// 传统方法
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

// es6写法
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

// 类的继承
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
```

-   **Promise async await 的使用**

    -   返回 Promise 对象的方法称为异步方法，异步方法请用 async 标出
    -   Promise 拥有 then，catch，finally 方法
    -   回调较多的时候，可以考虑改用同步写法

    > 请熟练掌握相关方法，`axios` 是依赖于 Promise 的 ajax 请求类，项目中会大量用到  
    > 使用实例可以看 `App.vue` 和 `application.js` 关于配置的初始化代码

```js
// 异步函数写法，返回一个Promise对象
async function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
}

// 多个异步函数的同步写法
async function asyncReadFile() {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}
```

# 进阶

## vue 插件开发

想要进行 vue 插件开发，请熟练掌握 vue 的生命周期，并知晓 `mixin` 的相关知识

> _如果想对所有的 vue 对象附加固定的参数或者方法，可以使用以下方法：_

```js
[import]: src/plugins/axios.js
```

> _高级的插件开发，需要实现对生命周期方法的修改，示例如下：_

```js
[import]: src/plugins/unWatch.js
```

## 相关技术使用实践

### 路由使用实践 vue-router

路由的使用方式较为简单，只要声明一个 VueRouter 对象。  
对于开发人员，重要的是要清楚路由的匹配方式

-   从顶级路由开始匹配，即 VueRouter 下的 `routers` 参数
-   匹配到顶级路由，再进行子路由的匹配，即路由下的 `children` 参数
-   匹配顺序由声明顺序决定
-   命名路由，由`name`参数进行区分，默认为 `default`

> _路由声明方式示例：_

```js
const router = new VueRouter({
    // 三个子路由，顺序匹配，error界面放到最后
    routes: [homeRouter, pageRouter, errorRouter],
});
```

-   **_嵌套路由的使用方式_**

嵌套路由常用于多页面的业务系统，具有以下特征：

-   系统需要多种布局方式，这时可以用顶级路由加以规定
-   具有多个子页面，且页面直接不互为关联

> _代码示例_

```html
<!-- App.vue 顶级路由 -->
<template>
    <router-view />
</template>

<!-- Default.vue 子界面路由，规定一种布局 -->
<template>
    <div>
        <header />
        <router-view />
        <footer />
    </div>
</template>

<!-- 实际业务组件 -->
<template>
    <div>...省略</div>
</template>
```

-   **_命名路由使用方式_**

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，这个时候命名视图就派上用场了。

-   存在同样的布局方式
-   相同布局内存在多种展示方式，如不同的 `menus`(目录栏)
-   其他可能的使用场景

> _代码示例_

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

> _一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：_

```js
const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz,
            },
        },
    ],
});
```

### 状态管理器实践 vuex

`vuex` 是为全局的组件提供一个 _被监听_ 的数据仓库，所有的 vue 组件公用该仓库
这样当一个组件改变了内部数据的时候，其他组件就能监听到数据变换
使用时候，提供以下使用参考：

-   不要直接操作数据，请通过 `Mutation` 等接口进行
-   模块较多的时候，请开启 `namespaced`（命名空间）
-   命名空间名称和 _数据提供模块或管理模块_ 保持一致，
    如 `user` 控制用户登陆的模块，其 vuex 命名空间也叫 user
-   取用数据的时候请注意数据状态，是否已经初始化

> _核心代码和思想都较为简单，代码如下：_

```js
function applyMixin(Vue) {
    var version = Number(Vue.version.split('.')[0]);

    if (version >= 2) {
        // 注意，vuex的数据，是在 beforeCreate 被继承
        Vue.mixin({ beforeCreate: vuexInit });
    } else {
        // override init and inject vuex init procedure
        // for 1.x backwards compatibility.
        var _init = Vue.prototype._init;
        Vue.prototype._init = function (options) {
            if (options === void 0) options = {};

            options.init = options.init
                ? [vuexInit].concat(options.init)
                : vuexInit;
            _init.call(this, options);
        };
    }

    /**
     * Vuex init hook, injected into each instances init hooks list.
     */

    function vuexInit() {
        var options = this.$options;
        // store injection
        if (options.store) {
            this.$store =
                typeof options.store === 'function'
                    ? options.store()
                    : options.store;
        } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
        }
    }
}
```
