import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
import { ACLRule } from "shared";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/projects",
        name: "Projects",
        meta: {
            requiresAuth: true,
            rules: [ACLRule.PROJECTS_LIST],
        },
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../components/Projects.vue"
            ),
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(/* webpackChunkName: "about" */ "../components/Login.vue"),
    },
    {
        path: "/registration",
        name: "registration",
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../components/Registration.vue"
            ),
    },
    {
        path: "/users",
        name: "users",
        meta: {
            requiresAuth: true,
            rules: [ACLRule.USERS_LIST],
        },
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../components/users/Users.vue"
            ),
    },
    {
        path: "/users-wrapper",
        name: "Users wrapper",
        meta: {
            requiresAuth: true,
            rules: [ACLRule.USERS_LIST],
        },
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../components/users/UsersWrapper.vue"
            ),
    },
    {
        path: "/roles",
        name: "roles",
        meta: {
            requiresAuth: true,
            rules: [ACLRule.ROLES_LIST],
        },
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../components/RolesList.vue"
            ),
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            const rules = store.getters.rules;

            if (
                to.matched.some((record) => {
                    return (
                        record.meta.rules === undefined ||
                        record.meta.rules.filter((r: ACLRule[]) =>
                            rules.includes(r)
                        ).length > 0
                    );
                })
            ) {
                next();
                return;
            }

            next("/");
            return;
        }

        next("/login");
    } else {
        next();
    }
});

export default router;
