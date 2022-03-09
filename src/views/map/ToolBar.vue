<template>
    <div :class="prefixCls + '-toolbar'">
        <span>
            <router-link to="/">返回主页</router-link>
        </span>
        <span @click="onToggleDraw">绘画</span>
    </div>
</template>

<script>
import DrawPanel from './draw';

export default {
    inject: ['MapView'],
    methods: {
        onToggleDraw() {
            this.$CompManager.checkAdd(DrawPanel, {
                provide: { MapView: this.MapView },
            });
        },
    },
    beforeDestroy() {
        this.$CompManager.remove(DrawPanel);
    },
};
</script>

<style lang="less">
.@{prefixCls}-toolbar {
    position: absolute;
    right: 10px;
    top: 10px;

    background-color: @component-background;

    span {
        display: inline-block;
        padding: 0.3em 1em;
        border: 1px solid @border-color;
        margin-left: -1px;

        cursor: pointer;
    }
}
</style>
