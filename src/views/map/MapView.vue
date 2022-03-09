<template>
    <div :class="prefixCls + '-map'">
        <div id="map"></div>
        <!-- 等待地图加载完毕再加载子组件 -->
        <template v-if="mapInited">
            <ToolBar />

            <!-- 预留slot传入外部其他组件 -->
            <slot />
        </template>
    </div>
</template>

<script>
import ToolBar from './ToolBar';

export default {
    components: { ToolBar },
    // 地图相关的对象不要被监听，会造成性能影响
    unWatch() {
        return { map: null, draws: {} };
    },
    // 判断地图是否已经初始化
    data() {
        return { mapInited: false };
    },
    // 为子组件传递map对象
    provide() {
        return {
            MapView: this,
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 创建地图对象实例，默认坐标系为经纬度
            const map = new GeoGlobe.Map({
                mapCRS: '4326',
                container: 'map',
            });

            // 添加天地图
            map.on('load', () => {
                const token = 'e90d56e5a09d1767899ad45846b0cefd';
                const layerVtc = new GeoGlobe.TDTLayer('vec_c', token);
                const layerCva = new GeoGlobe.TDTLayer('cva_c', token);
                map.addLayer(layerVtc);
                map.addLayer(layerCva);

                this.map = map;
                this.mapInited = true;
            });
        });
    },
    beforeDestroy() {
        this.map.remove();
        delete this.map;
    },
    methods: {
        /************ api接口 START ************* */
        initDraw(key, drawOptions) {
            if (!this.draws[key]) {
                this.draws[key] = new MapboxDraw(drawOptions);
                this.map.addControl(this.draws[key]);
            }
            return this.draws[key];
        },
        getDraw(key) {
            return this.draws[key];
        },
        removeDraw(key) {
            if (this.draws[key]) {
                this.map.removeControl(this.draws[key]);
                delete this.draws[key];
            }
        },
        /************ api接口 END ************* */
    },
};
</script>

<style lang="less">
.@{prefixCls}-map,
#map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
