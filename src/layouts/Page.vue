<template>
    <div id="page-layout">
        <Header fixed><Nav :navs="navs" /></Header>
        <Aside :menus="menus" :active-name="activeName" @on-select="onSelect" />
        <main class="page">
            <router-view class="content" />
        </main>
    </div>
</template>

<script>
import debounce from 'lodash.debounce';

import Nav from './includes/Nav';
import Aside from './includes/Aside';
import Header from './includes/Header';

export default {
    components: { Nav, Aside, Header },
    inject: ['CONFIG'],
    data() {
        return {
            navs: this.CONFIG['navs'],
            activeName: '',
        };
    },
    computed: {
        // 侧边导航
        menus() {
            const navKey = this.$route.meta.navKey;
            return this.CONFIG[navKey];
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                // 选中第一个
                this.$nextTick(() => {
                    const anchor = document.querySelector('.headerlink');
                    this.activeName = anchor ? anchor.id : '';
                });
            },
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
        scrollHandler: debounce(function () {
            this.setActiveHash();
        }, 100),
        setActiveHash() {
            const anchors = document.querySelectorAll('.headerlink');

            const scrollTop = Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );

            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i];
                const nextAnchor = anchors[i + 1];

                const isActive =
                    (i === 0 && scrollTop === 0) ||
                    (scrollTop >= anchor.offsetTop + 10 &&
                        (!nextAnchor || scrollTop < nextAnchor.offsetTop - 10));
                if (isActive) {
                    this.activeName = anchor.id;
                }
            }
        },
        onSelect(val) {
            const anchor = document.getElementById(val);
            anchor && anchor.scrollIntoView();
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
};
</script>

<style lang="less">
@top-height: @header-height + 1px;

#page-layout {
    .page {
        padding-left: @sidebar-width + 20px;

        .content {
            padding: 2rem 2.5rem;
            max-width: @content-width;
            margin: 0 auto;
        }
    }
}
</style>
