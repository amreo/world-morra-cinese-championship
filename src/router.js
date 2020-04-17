import VueRouter from "vue-router";
import Ranks from "./components/Ranks.vue";
import Login from "./components/Login.vue";
import Play from "./components/Play.vue";


export default new VueRouter({
    routes: [
        { path: '', component: Login},
        { path: '/ranks', component: Ranks},
        { path: '/login', component: Login},
        { path: '/play/:id', component: Play},
    ]
});
  