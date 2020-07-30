import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import axios from 'axios';

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth
    }
})

axios.defaults.headers.common['Authorization'] = "Bearer " + store.getters.token;

export default store;
