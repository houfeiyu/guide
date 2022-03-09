<template>
    <header id="header" :class="{ fixed }">
        <router-link to="/" id="logo">
            <img src="@/assets/img/logo.png" alt="vue logo" />
            <span>{{ name }}</span>
        </router-link>
        <slot />
    </header>
</template>

<script>
export default {
    props: { fixed: Boolean },
    data() {
        return {
            name: 'GeoOnline 前端组开发指南',
        };
    },
};
</script>

<style lang="less">
#header {
    z-index: @zindex-header;

    height: @header-height;
    padding: 10px 60px;
    background-color: #fff;

    display: inline-flex;
    width: 100%;
    align-items: center;

    // logo样式
    #logo {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2c3e50;

        img {
            margin-right: 10px;
            height: @header-height - 30px;
            vertical-align: middle;
            margin-top: -2px;
        }
    }

    // fixed下的样式
    &.fixed {
        position: fixed;
        top: 0;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
        transition: background-color 0.3s ease-in-out;
    }
}
</style>
