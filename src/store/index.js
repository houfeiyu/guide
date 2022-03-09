import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

import draw from './draw';

export default new Store({
    modules: { draw },
});
