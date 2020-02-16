import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "./components/Home";
import Login from "./components/Login";

Vue.use(VueRouter);


const routes = [
    {path: '/home', component: HelloWorld},
    {path: '/login', component: Login}
];


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;

