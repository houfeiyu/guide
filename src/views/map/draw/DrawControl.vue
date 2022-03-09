<template>
    <i-ButtonGroup :class="prefixCls + '-draw-control'">
        <template v-for="(item, i) in modes">
            <i-Button
                :key="i"
                @click="onModeChange(item.mode)"
                :type="mode === item.mode ? 'primary' : 'default'"
            >
                {{ item.text }}
            </i-Button>
        </template>
    </i-ButtonGroup>
</template>

<script>
export default {
    inject: ['MapView'],
    unWatch() {
        return { draw: this.MapView.getDraw('draw') };
    },
    data() {
        return {
            mode: 'static',
            modes: [
                { mode: 'static', text: '关闭绘制' },
                { mode: 'draw_point', text: '点' },
                { mode: 'draw_line_string', text: '线' },
                { mode: 'draw_polygon', text: '面' },
            ],
        };
    },
    created() {
        this.MapView.map.on('draw.create', this.drawEndHandler);
    },
    beforeDestroy() {
        this.MapView.map.off('draw.create', this.drawEndHandler);
    },
    methods: {
        drawEndHandler({ features }) {
            const feature = features[0];
            if (this.draw.get(feature.id)) {
                // 派发事件
                this.$emit('on-draw-end', feature);

                // 连续绘制
                setTimeout(() => {
                    this.onModeChange(this.mode);
                }, 0);
            }
        },
        onModeChange(mode) {
            this.draw.changeMode(mode);
            this.mode = mode;
        },
    },
};
</script>

<style lang="less">
.@{prefixCls}-draw-control {
    display: inline-flex;
    width: 100%;

    button {
        flex: 1;
    }
}
</style>
