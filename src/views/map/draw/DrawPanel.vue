<template>
    <div :class="prefixCls + '-draw-panel'">
        <span :class="prefixCls + '-draw-panel-close'" @click="onClose">x</span>
        <!-- 绘画控件 -->
        <DrawControl @on-draw-end="onDrawEnd" />

        <!-- 结果集 -->
        <DrawResult :list="featureList">
            <template v-slot="{ value, index }">
                <p>id: {{ value.id }}</p>
                <i-Button @click="onRemove(index, value.id)">删除</i-Button>
            </template>
        </DrawResult>
    </div>
</template>

<script>
import DrawControl from './DrawControl';
import DrawResult from './DrawResult';

import { mapState, mapMutations } from 'vuex';

const NAMESPACE = 'draw';

export default {
    components: { DrawControl, DrawResult },
    inject: ['MapView'],
    computed: {
        ...mapState(NAMESPACE, ['featureList']),
    },
    created() {
        this.MapView.initDraw(NAMESPACE, {
            defaultMode: 'static',
            displayControlsDefault: false,
        }).set({
            type: 'FeatureCollection',
            features: JSON.parse(JSON.stringify(this.featureList)),
        });
    },
    beforeDestroy() {
        this.MapView.removeDraw(NAMESPACE);
    },
    methods: {
        ...mapMutations(NAMESPACE, {
            $Add: 'add',
            $Remove: 'remove',
        }),
        // 关闭浮云框
        onClose() {
            this.$destroy();
        },
        // 绘画完毕事件
        onDrawEnd(f) {
            this.$Add(f);
        },
        // feature删除
        onRemove(index, fid) {
            this.MapView.getDraw(NAMESPACE).delete(fid);
            this.$Remove(index);
        },
    },
};
</script>

<style lang="less">
.@{prefixCls}-draw-panel {
    position: absolute;
    left: 10px;
    top: 10px;

    width: 300px;
    padding: 2em 1em 1em;
    border-radius: 4px;

    background-color: @component-background;
    box-sizing: content-box;

    &-close {
        position: absolute;
        right: 5px;
        top: 3px;
        cursor: pointer;
    }
}
</style>
