<template>
    <i-Modal v-model="modal" :width="width" @on-cancel="cancel">
        <p slot="header" style="color: #f60; text-align: center;">
            <i-Icon type="ios-information-circle"></i-Icon>
            <span>{{ title }}</span>
        </p>
        <div style="text-align: center; font-size: 13px;" v-if="message">
            <p>{{ message }}</p>
        </div>
        <div slot="footer">
            <i-Button type="error" size="large" long @click="del">
                删除
            </i-Button>
        </div>
    </i-Modal>
</template>

<script>
export default {
    props: {
        title: { type: String, default: '删除确认' },
        message: { type: String, default: '删除确认？' },
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
        del() {
            this.$emit('on-ok');
        },
    },
};
</script>
