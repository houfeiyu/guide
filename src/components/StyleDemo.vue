<template>
    <!-- 声明一个 .box-wrapper 的盒子 -->
    <div :class="prefixCls">
        <!-- box-wrapper-title 盒子标题 -->
        <div :class="prefixCls + '-title'">
            <slot />
        </div>
        <!-- box-wrapper-content 盒子内容 -->
        <div :class="prefixCls + '-content'">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            /**
             * 类名前缀，
             * 参考的命名方式： [前缀（必须）] + [组件名] + [后缀（可选）]
             *
             * 示例（iviewUI列表组件）：
             * 父组件：ivu-list -->
             *        ivu-list-header -->
             *        ivu-list-footer
             * 子组件单条结果：ivu-list-item --> 依次类推...
             */
            prefixCls: 'my-box',
        };
    },
};
</script>

<style lang="less">
// 声明类名前缀
@prefixCls: box-wrapper;

// 盒子
.@{prefixCls} {
    background-color: #fff;
    border: 1px solid;
    border-radius: 2px;

    // 盒子标题
    &-title {
        height: 20px;
        padding: 0.5em 0;
        text-align: center;
    }

    // 盒子内容
    &-content {
        max-height: 20em;
        padding: 1em;
    }

    // 如果存在样式覆盖，写在class定义下，保证只对当前组件生效，例如：
    .ivu-button {
        font-size: 1.3em;
    }
    // ....
}
</style>
