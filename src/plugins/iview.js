import Vue from 'vue';
import iview from 'view-design';

// 引入本地的iview.less
// 创建本地iview.less是为了对iview进行样式自定义
import '@/assets/styles/iview.less';

// 为iview组件注册统一的前缀 i-
Object.keys(iview).forEach(key => {
    const comp = iview[key];

    // vue组件一定是个对象
    if (typeof comp === 'object') {
        // 如果是个vue组件
        if (comp._compiled || !!comp.render || !!comp.mixins) {
            Vue.component('i-' + key, comp);
        }
    }
});

// 绑定浮云框之类的组件
const { LoadingBar, Message, Modal, Notice, Spin } = iview;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Spin = Spin;

// 消息弹出框存在时长
Message.config({ duration: 3 });

/**
 * 添加一个依赖iview全局loading模态框
 * @param {Boolean} flag 显示还是隐藏
 * @param {String} html 显示时显示的文字
 * @param {*} param2 其他配置项，是否支持点击关闭以及时候的回调参数
 */
Vue.prototype.$loading = function (
    flag = false,
    html = 'Loading',
    { maskClosable, closeBack } = {}
) {
    if (flag) {
        this.$Spin.show({
            render() {
                return (
                    <div class="loading">
                        <i-Icon type="ios-loading" size="40" />
                        <div domPropsInnerHTML={html}></div>
                    </div>
                );
            },
        });
        // 遮罩关闭
        if (maskClosable) {
            const el = document.querySelector('body>div.ivu-spin-fullscreen');
            if (el) {
                el.onclick = () => {
                    this.$Spin.hide();
                    // 关闭时候的回调事件
                    if (closeBack) setTimeout(closeBack, 0);
                };
            }
        }
    } else {
        this.$Spin.hide();
    }
};
