<template>
    <i-Modal v-model="modal" :width="width" @on-cancel="cancel">
        <p slot="header" style="color: #2d8cf0; text-align: center;">
            <i-Icon type="ios-information-circle"></i-Icon>
            <span>{{ title }}</span>
        </p>
        <div style="text-align: center; font-size: 13px;" v-if="message">
            <p>{{ message }}</p>
        </div>
        <div slot="footer">
            <i-Row>
                <i-Col :span="11">
                    <i-Button type="default" size="large" long @click="cancel">
                        {{ cancelText }}
                    </i-Button>
                </i-Col>
                <i-Col :span="11" :offset="2">
                    <i-Button type="primary" size="large" long @click="ok">
                        {{ okText }}
                    </i-Button>
                </i-Col>
            </i-Row>
        </div>
    </i-Modal>
</template>

<script>
export default {
    props: {
        title: { type: String, default: '操作确认' },
        message: { type: String, default: '继续操作？' },
        okText: { type: String, default: '确认' },
        cancelText: { type: String, default: '取消' },
        width: { type: Number, default: 360 },
    },
    data() {
        return {
            modal: false,
        };
    },
    mounted() {
        this.modal = true;
    },
    beforeDestroy() {
        this.modal = false;
    },
    methods: {
        cancel() {
            this.$emit('on-cancel');
        },
        ok() {
            this.$emit('on-ok');
        },
    },
};
</script>
