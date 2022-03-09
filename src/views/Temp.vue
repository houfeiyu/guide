<template>
    <div id="temp-view">
        <!-- 临时 测试页面 -->
        <div
            v-for="i in 21"
            :key="i"
            class="ball-container"
            :style="{
                width: size + 'px',
                height: size + 'px',
                left: getLeft(i) + 'px',
                top: getTop(getLeft(i), 1 - (i % 2)),
            }"
        >
            <span class="ball" :style="getSize(getLeft(i))">
                {{ i }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            maxWidth: 500,
            maxHeight: 200,
            balls: [],
        };
    },
    computed: {
        size() {
            return this.maxHeight / 2;
        },
        halfWidth() {
            return this.maxWidth / 2;
        },
    },
    mounted() {
        this.maxWidth = this.$el.clientWidth;
        this.maxHeight = this.$el.clientHeight;
    },
    methods: {
        getLeft(i) {
            return (i - 1) * this.size;
        },
        getTop(left, p) {
            const percent = Math.abs(this.halfWidth - left) / this.halfWidth;
            return (
                // 根据奇偶性判断是否需要平移
                Math.pow(p * percent, 1) * this.size +
                // 根据百分比，模仿弧度偏移
                (Math.pow(1 - percent, 3) * this.size) / 3 +
                'px'
            );
        },
        getSize(left) {
            const percent = Math.abs(this.halfWidth - left) / this.halfWidth;
            const minSize = this.size / 3;

            return {
                width: minSize + percent * minSize + 'px',
                height: minSize + percent * minSize + 'px',
            };
        },
    },
};
</script>

<style lang="less" scoped>
#temp-view {
    position: absolute;
    width: 100%;
    height: 300px;
    border: 1px solid;

    .ball-container {
        position: absolute;

        display: inline-block;
        height: 100px;
        width: 100px;

        // background-color: gray;

        display: flex;
        justify-content: center;
        align-items: center;

        .ball {
            display: inline-block;
            border-radius: 50%;
            border: 1px solid;

            text-align: center;
            background-color: #fff;
        }
    }
}
</style>
