<template>
    <ul>
        <template v-for="(item, i) in list">
            <li
                :class="{ active: i === currentIndex }"
                :key="i"
                @click="onSelectHandler(i)"
            >
                <slot :value="item">{{ item }}</slot>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
    /**
     * 定义的对外属性，对于初始化必须的属性，请指定默认值
     * 命名方式如下 `activeName`
     *
     * 使用示例：
     * <List :list="listData" :active-anme="1" on-select="onListSlect"/>
     */
    props: {
        list: Array,
        activeIndex: { type: Number, default: 0 },
    },
    data() {
        return {
            currentIndex: this.activeIndex,
        };
    },
    methods: {
        /**
         * 点击事件句柄，强烈建议采用以下命名方式
         * （通过命名，就可以区分出来事件句柄和普通的句柄）
         * [on] + [事件名称] + [后缀（可选）]
         */
        onSelectHandler(val) {
            this.currentIndex = val;
            /**
             * 对外派发事件，vue中是通过$emit触发
             * 命名规范统一为 ：[on] + [自定义事件名]
             * 示例：on-select，on-click，on-change
             */
            this.$emit('on-select', val);
        },

        /**
         * 对外暴露的接口部分：
         * 接口很多的时候，建议参与如下的注释方式，来区分普通方法和接口方法
         */
        /* ************* 外部接口 Start *************** */
        setActiveIndex(val) {
            this.currentIndex = +val || 0;
        },
        /* ************* 外部接口 End *************** */
    },
};
</script>
