import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import Login from "./components/Login";

Vue.use(VueRouter);


const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login}
];


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;

