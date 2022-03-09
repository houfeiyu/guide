<template>
    <nav id="nav">
        <i-Menu mode="horizontal" :active-name="activeName">
            <template v-for="(menu, i) in navs">
                <!-- if 存在子目录 -->
                <i-Submenu v-if="menu.children" :key="i" :name="i">
                    <template slot="title">{{ menu.text }}</template>
                    <!-- loop 节点 -->
                    <template v-for="(cmenu, j) in menu.children">
                        <!-- if 存在分组 -->
                        <i-MenuGroup
                            v-if="cmenu.children"
                            :title="cmenu.text"
                            :key="j"
                        >
                            <LinkComponent
                                v-for="(ccmenu, k) in cmenu.children"
                                :key="i + '-' + j + '-' + k"
                                :option="ccmenu"
                            />
                        </i-MenuGroup>
                        <!-- else 不存在分组 -->
                        <LinkComponent
                            v-else
                            :key="i + '-' + j"
                            :option="cmenu"
                        />
                    </template>
                </i-Submenu>
                <!-- else 不存在子目录 -->
                <LinkComponent v-else :key="i" :option="menu" />
            </template>
        </i-Menu>
    </nav>
</template>

<script>
// 声明一个匿名组件
const LinkComponent = {
    functional: true,
    props: ['option'],
    render(h, context) {
        const key = context.data.key;
        const { to, text, prefix, suffix } = context.props.option;

        // 有限取router链接做为name，否则取key
        const name = String(to || key);

        let config = {};
        // 如果是个外部的url，附加相关参数
        if (/^(http|https):\/\//.test(to)) {
            // JSX Spread 目前只支持vnode结构的对象
            config = {
                attrs: {
                    target: '_blank',
                    rel: 'noopener',
                },
                props: {
                    replace: true,
                },
            };
        }

        return (
            <i-MenuItem name={name} to={to} {...config}>
                {prefix ? <i-Icon type={prefix} /> : ''}
                {text}
                {suffix ? <i-Icon type={suffix} /> : ''}
            </i-MenuItem>
        );
    },
};

export default {
    components: { LinkComponent },
    props: { navs: Array },
    computed: {
        activeName() {
            return this.$route.path;
        },
    },
};
</script>

<style lang="less">
#nav {
    @nav-height: @header-height - 20px;

    flex: 1;

    display: inline-flex;
    justify-content: flex-end;

    .ivu-menu-horizontal {
        height: @nav-height;
        line-height: @nav-height;

        & > .ivu-menu-item,
        & > .ivu-menu-submenu {
            padding: 0 0.6em;

            i.ivu-icon {
                margin-right: 0;
            }
        }

        &.ivu-menu-light:after {
            display: none;
            height: 0;
        }
    }
}
</style>
