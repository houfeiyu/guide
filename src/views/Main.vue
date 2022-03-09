<template>
    <main class="main-wrapper">
        <div class="title-bg">
            <particles-bg
                type="circle"
                num="10"
                :bg="true"
                style="background: #f1f8fe;"
            ></particles-bg>
            <div class="banner">
                <h1>工程模板&开发指南</h1>
                <p>
                    一套为组内开发者准备的基于 Vue 的开发参考
                </p>
            </div>
        </div>
        <div class="projects">
            <div class="content">
                <h2
                    class="ant-typography"
                    style="font-weight: lighter; color: rgb(49, 70, 89);"
                >
                    工程模板
                </h2>
                <i-Row :gutter="16" style="margin-top: 20px;">
                    <i-Col span="12">
                        <i-Card>
                            <div style="text-align: center;">
                                <img
                                    style="margin-bottom: 25px;"
                                    src="@/assets/img/iview.svg"
                                />
                                <h3>
                                    vue-cli project with iView
                                </h3>
                                <i-Divider />
                                <a
                                    href="http://172.17.0.202/geoonine-group1/vue-project-template/tree/iview"
                                    target="_blank"
                                >
                                    <i-Icon type="logo-github" />
                                    源码
                                </a>
                                <router-link to="/guide-iview">
                                    <i-Icon type="md-help-circle" />
                                    指南
                                </router-link>
                            </div>
                        </i-Card>
                    </i-Col>
                    <i-Col span="12">
                        <i-Card>
                            <div style="text-align: center;">
                                <img
                                    style="width: 110px; margin-top: 10px;"
                                    src="@/assets/img/element.svg"
                                />
                                <h3>
                                    vue-cli project with Element UI
                                </h3>
                                <i-Divider />
                                <a
                                    href="http://172.17.0.202/geoonine-group1/vue-project-template/tree/element"
                                    target="_blank"
                                >
                                    <i-Icon type="logo-github" />
                                    源码
                                </a>
                                <router-link to="/guide-element">
                                    <i-Icon type="md-help-circle" />
                                    指南
                                </router-link>
                            </div>
                        </i-Card>
                    </i-Col>
                </i-Row>
                <i-Row :gutter="16" style="margin-top: 20px;">
                    <i-Col span="12">
                        <i-Card>
                            <div style="text-align: center;">
                                <img
                                    style="margin-bottom: 25px;"
                                    src="@/assets/img/element-plus-logo.svg"
                                />
                                <h3>
                                    vue-cli 4.5 project with Element Plus
                                </h3>
                                <i-Divider />
                                <a
                                    href="http://172.17.0.202/geoonine-group1/vue-project-template/tree/element3"
                                    target="_blank"
                                >
                                    <i-Icon type="logo-github" />
                                    源码
                                </a>
                                <router-link to="/guide-element-plus">
                                    <i-Icon type="md-help-circle" />
                                    指南
                                </router-link>
                            </div>
                        </i-Card>
                    </i-Col>
                    <i-Col span="12">
                        <i-Card>
                            <div style="text-align: center;">
                                <img
                                    style="width: 110px; margin-top: 10px;"
                                    src="@/assets/img/vant-logo.png"
                                />
                                <h3>
                                    vue-cli 4.5 project with Vant v3
                                </h3>
                                <i-Divider />
                                <a
                                    href="http://172.17.0.202/geoonine-group1/vue-project-template/tree/vant3"
                                    target="_blank"
                                >
                                    <i-Icon type="logo-github" />
                                    源码
                                </a>
                                <router-link to="/guide-vant3">
                                    <i-Icon type="md-help-circle" />
                                    指南
                                </router-link>
                            </div>
                        </i-Card>
                    </i-Col>
                </i-Row>
            </div>
        </div>
    </main>
</template>

<script>
import { ParticlesBg } from 'particles-bg-vue';

export default {
    components: { ParticlesBg },
};
</script>

<style lang="less" scope>
.main-wrapper {
    .title-bg {
        position: relative;
        width: 100%;
        height: 450px;
        .banner {
            text-align: center;
            h1 {
                padding: 130px 130px 40px;
                font-size: 48px;
                line-height: 48px;
                color: #555;
            }
        }
    }
    .projects {
        max-width: 1256px;
        margin: 0 auto;
        .content {
            margin: 88px 40px 124px;
            h2 {
                font-size: 30px;
            }
            img {
                width: 100px;
            }
            i {
                font-size: 18px;
            }
            a {
                margin-left: 32px;
                margin-right: 32px;
                font-size: 16px;
            }
        }
    }
}
</style>
