// layouts各种页面样式布局
import Default from '../layouts/Default';

// views实际内容组件
import Main from '../views/Main';

// 注册一个默认布局（一般用于主页相关）
export default {
    path: '/',
    component: Default,
    children: [
        // 注册主页
        {
            name: '主页',
            path: '',
            component: Main,
        },
    ],
};
