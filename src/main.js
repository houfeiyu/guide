import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 代码高亮
import 'prismjs/themes/prism.css';
// markdown页面样式
import '@/assets/styles/markdown.less';

// 引入iview
import './plugins/iview.js';
// 引入axios
import './plugins/axios.js';
// 引入watch
import './plugins/unWatch.js';

// router
import router from './router/';
// store
import store from './store/';

// 引用组件动态添加删除管理器
import compManager from './plugins/comp-manager';
Vue.use(compManager);

// 添加全局类名前缀变量
Vue.prototype.prefixCls = 'geo';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
