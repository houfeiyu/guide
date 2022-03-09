// 书写配置项时，请注意浏览器对语法的兼容性

module.exports = {
  // 需要激活的配置项，只对打包后有效，开发模式默认读取dev
  active: "prod",
  // 导航栏目录
  navs: [
    {
      text: "指南",
      children: [
        {
          text:"vue v2.x",
          children: [
            { text: "iview版", to: "/guide-iview" },
            { text: "element版", to: "/guide-element" },
          ]
        },
        {
          text:"vue v3.x",
          children: [
            { text: "element plus版", to: "/guide-element-plus" },
            { text: "vant v3版", to: "/guide-vant3" },
            { text: "从 Vue 2 迁移", to: "https://v3.cn.vuejs.org/guide/migration/introduction.html" },
            { text: "从 Element UI 2.x 迁移", to: "https://github.com/element-plus/element-plus/discussions/5657" }
          ],
        }
      ]
    },
    {
      text: "应用示例",
      children: [
        { text: "地图", to: "/map" }
      ]
    },
    {
      text: "相关技术",
      children: [
        {
          text: "vue v2.x技术",
          children: [
            { text: "vue.js", to: "https://cn.vuejs.org/" },
            { text: "vue-router", to: "https://router.vuejs.org/zh/" },
            { text: "vuex", to: "https://vuex.vuejs.org/zh/" },
            { text: "vue-jsx", to: "https://github.com/vuejs/babel-plugin-transform-vue-jsx" }
          ] },
        {
          text: "UI框架",
          children: [
            { text: "iview", to: "https://iviewui.com/docs/introduce" },
            { text: "Element UI ", to: "https://element.eleme.cn/#/zh-CN" }
          ]
        },
        {
          text: "其他",
          children: [
            { text: "ES6入门教程", to: "https://es6.ruanyifeng.com/" },
            { text: "less教程", to: "http://lesscss.cn/" },
            { text: "sass教程", to: "https://www.sass.hk/" }
          ]
        }
        ]
    },
    {
      text: "GitLab",
      children: [
        {
          text: "站点源码",
          children: [
            { text: "指南源码", to: "http://172.17.0.202/geoonine-group1/vue-project-template/tree/guide" }
          ]
        },
        {
          text: "vue v2.x",
          children: [
            { text: "iview版项目模板源码", to: "http://172.17.0.202/geoonine-group1/vue-project-template/tree/iview" },
            { text: "element版项目模板源码", to: "http://172.17.0.202/geoonine-group1/vue-project-template/tree/element" }
          ]
        },
        {
          text: "vue v3.x", children: [
            { text: "element plus版项目模板源码", to: "http://172.17.0.202/geoonine-group1/vue-project-template/tree/element3" },
            { text: "Vant v3版项目模板源码", to: "http://172.17.0.202/geoonine-group1/vue-project-template/tree/vant3" }
          ]
        }
        ]
    }
    ],
  // guides
  guides: [
    { text: "介绍" },
    { text: "开始",
      children: [
        { text: "目录结构" },
        { text: "默认配置" },
        { text: "运行流程" }
      ]
    },
    {
      text: "编码风格规范",
      children: [
        { text: "命名规范" },
        { text: "组件定义和使用" },
        { text: "编程风格" }
      ]
    },
    {
      text: "进阶",
      children: [
        { text: "vue 插件开发", to: "vue-插件开发" },
        { text: "相关技术使用实践" }
      ]
    }],
  // guides
  guidesVue3: [
    { text: "介绍" },
    { text: "开始",
      children: [
        { text: "目录结构" },
        { text: "默认配置" },
        { text: "运行流程" }
      ]
    },
    {
      text: "从 Vue 2 迁移",
      children: [
        { text: "值得注意的新特性" },
        { text: "非兼容的变更" },
      ]
    },
    {
      text: "编码风格规范",
      children: [
        { text: "命名规范" },
        { text: "组件定义和使用" },
        { text: "编程风格" }
      ]
    }
    ],
  // api
  apis: []
};
