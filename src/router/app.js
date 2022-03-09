// views实际内容组件
import MapView from '../views/map/MapView.vue';
import Temp from '../views/Temp.vue';

// 单页面应用
export default [
    {
        path: '/map',
        component: MapView,
    },
    {
        path: '/temp',
        component: Temp,
    },
];
