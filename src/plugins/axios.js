import Vue from 'vue';
import Axios from 'axios';

// 请求时带上cookies
Axios.defaults.withCredentials = true;

// 给所有的vue对象附加一个axios请求方法
Vue.prototype.$axios = Axios;
