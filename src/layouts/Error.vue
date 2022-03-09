<template>
    <div id="error-layout">
        <router-view />
        <h1>{{ code }}</h1>
        <blockquote>这是个{{ code }}错误！</blockquote>
        <router-link to="/">
            返回主页
        </router-link>
    </div>
</template>

<script>
export default {
    computed: {
        code() {
            return this.$route.params.code || 'unknown';
        },
    },
};
</script>

<style lang="less">
#error {
    box-sizing: content-box;
    max-width: 740px;
    margin: 0 auto;
    padding: 2rem;

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin-top: -1.5rem;
        margin-bottom: 1rem;
        padding-top: 4.6rem;
    }

    blockquote {
        font-size: 1.2rem;
        color: #999;
        margin: 1em 0;
        padding-left: 1rem;
        border-left: 0.25rem solid #dfe2e5;
    }

    a {
        color: #3eaf7c;
        font-weight: 500;
        text-decoration: none;
    }
}
</style>
