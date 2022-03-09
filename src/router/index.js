import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 不需要layout的路由
import appRouters from './app';

// 相关layout下的配置界面
import homeRouter from './home';
import pageRouter from './page';
import errorRouter from './error';

const router = new VueRouter({
    // 路由，顺序匹配，error界面放到最后
    routes: [...appRouters, homeRouter, pageRouter, errorRouter],
});

router.beforeEach((to, from, next) => {
    // 不存在匹配要素的时候返回到404
    if (!to || to.matched.length === 0) {
        next('/404');
    } else {
        next();
    }
});

export default router;
