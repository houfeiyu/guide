<script>
export default {
    // 名称，这些配置不属于vue初始化必备变量，一般是框架开发人员定义的属性值
    name: 'Custom',

    // mixins，要混入的配置项，mixin一般用来定义组件接口
    mixins: [],
    // 对子组件提供数据，如果不熟悉该选项，建议不要使用
    provide() {
        return { root: this };
    },

    /**
     * 外部传入的数据，类似html标签属性
     * 变量名称定义格式：maxWidth
     * 使用格式 :max-width="200"
     */
    props: { maxWidth: [Number, String] },
    /**
     * 取得父节点提供的数据，和provide对应
     */
    inject: ['root'],
    // 内部数据，需要被监听的数据
    data() {
        /**
         * 在使用其他框架的时候，如果对象本身很复杂
         * 监听会造成性能低下，且可能发生未知兼容性问题
         * 此时可以通过 Object.assign(this, { map: null })定义相关不被监听的null值
         *
         * 注意：这里定义的值，除了在方法中使用，
         * 不建议在被监听的属性中使用（如：computed，watch）
         * 否则可能会被vue框架拦截，再次生成被监听的对象
         */
        Object.assign(this, { map: null });
        return {};
    },
    // 计算属性，本质和data是一样的
    computed: {},
    // 计算数据修改后调用的句柄
    watch: {},

    // 自定义渲染函数，各位可以自行阅读jsx或者vnode的相关知识
    render() {
        return '';
    },

    /************************ 声明周期开始 *************************/
    beforeCreate() {
        // 此时数据未被初始化，this对象已经存在
        // 一般在此处进行事件绑定派发相关操作
    },
    created() {
        // 数据被初始化了，但是el还没初始化
        // 这里一般进行数据初始化操作
        // 注意：如果一个数据需要使用dom对象，不建议在此处初始化
    },
    beforeMount() {
        // 模板被编译完毕，但是el还是没有渲染
        // 此处可以进行数据初始化或者事件绑定派发等部分预处理操作
    },
    mounted() {
        // el编译完毕
        // 此时可以初始化需要引用el的变量
    },
    beforeUpdate() {
        // dom更新前，一般用不到相关方法
    },
    updated() {
        // dom更新后，一般用不到相关方法
    },
    beforeUnmount() {
        // 组件销毁前，此时this还存在
        // 一般用来进行销毁变量，解绑事件等操作
    },
    unmounted() {
        // 组件销毁后，this对象已经不存在了
        // 此时不应该再进行任何操作
    },
    /************************ 声明周期结束 *************************/

    methods: {},
};
</script>
