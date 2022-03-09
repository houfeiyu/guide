<template>
    <div>
        <Header><Nav :navs="navs" /></Header>
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Nav from './includes/Nav';
import Header from './includes/Header';
import Footer from './includes/Footer';

export default {
    components: { Nav, Header, Footer },
    inject: ['CONFIG'],
    data() {
        return {
            navs: this.CONFIG['navs'],
        };
    },
};
</script>
