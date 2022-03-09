// layouts各种页面样式布局
import ErrorLayout from '../layouts/Error';

/**
 * 错误界面，放到最后（降低匹配的优先级）
 * 传递一个code，这里是个偷懒的写法（请根据需求定制错误界面）
 */
export default {
    name: '错误界面',
    path: '/:code',
    component: ErrorLayout,
    beforeEnter: (to, from, next) => {
        const code = to.params.code;
        // 非数字错误，跳转到404
        if (isNaN(+code)) {
            next('/404');
        } else {
            next();
        }
    },
};
