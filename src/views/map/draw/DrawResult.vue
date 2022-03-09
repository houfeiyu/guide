<template>
    <ul :class="prefixCls + '-draw-result'">
        <i-Alert v-show="list.length === 0">
            暂无数据...
        </i-Alert>
        <li v-for="(item, i) in list" :key="i">
            <div>
                <slot :value="item" :index="i" />
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['list'],
};
</script>

<style lang="less">
.@{prefixCls}-draw-result {
    margin-top: 1.5em;
    list-style: none;

    max-height: 600px;
    overflow: auto;

    li {
        margin: 0.5em 0;
        padding: 0.5em;
        border: 1px solid @border-color;
        cursor: pointer;
    }
}
</style>
