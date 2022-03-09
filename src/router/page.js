// layouts各种页面样式布局
import Page from '../layouts/Page';

// views实际内容组件
import Guide4iView from '../views/Guide4iView.md';
import Guide4Element from '../views/Guide4Element.md';
import Guide4Element3 from '../views/Guide4Element3.md';
import Guide4Vant3 from '../views/Guide4Vant3.md';

// 注册一个Page布局
export default {
    path: '/',
    component: Page,
    children: [
        {
            name: '指南(iView版本)',
            path: 'guide-iview',
            meta: { navKey: 'guides' },
            component: Guide4iView,
        },
        {
            name: '指南(Element版本)',
            path: 'guide-element',
            meta: { navKey: 'guides' },
            component: Guide4Element,
        },
        {
            name: '指南(Element Plus版本)',
            path: 'guide-element-plus',
            meta: { navKey: 'guidesVue3' },
            component: Guide4Element3,
        },
        {
            name: '指南(Vant3 版本)',
            path: 'guide-vant3',
            meta: { navKey: 'guidesVue3' },
            component: Guide4Vant3,
        },
    ],
};
