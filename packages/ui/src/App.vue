<template>
    <v-app>
        <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" fixed app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">OKR</v-list-item-title>
                    <v-list-item-subtitle
                        >Welcome back, {{ userName }}</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    router
                    :to="item.to"
                    exact
                >
                    <access-control :accessRoles="item.rules">
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </access-control>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar fixed app>
            <v-app-bar-nav-icon
                v-if="isLoggedIn"
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <v-spacer></v-spacer>

            <v-toolbar-items v-if="isLoggedIn" class="hidden-sm-and-down">
                <v-btn text to="/" exact>Home</v-btn>
                <v-btn text to="/projects" exact>Projects</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="isLoggedIn">
                <v-btn text @click="logout">Logout</v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import HelloWorld from "./components/HelloWorld.vue";
import { User } from "./store/auth/auth.types";
import AccessControl from "./components/AccessControl.vue";
import { ACLRule } from "shared";

Vue.component("AccessControl", AccessControl);
@Component({
    components: { HelloWorld },
})
export default class App extends Vue {
    @Getter("isLoggedIn")
    isLoggedIn!: boolean;
    @Getter("userName")
    userName!: string;
    @Action("logout")
    logout!: any;
    @Action("getCurrentUser")
    getCurrentUser: any;
    @Getter("user")
    user!: User;

    mounted(): void {
        if (this.isLoggedIn && !this.user) {
            this.getCurrentUser();
        }
    }

    drawer = true;
    items = [
        { rules: [], title: "Home", to: "/" },
        { rules: [], title: "Projects", to: "/projects" },
        { rules: [], title: "Users", to: "/users" },
        { rules: [], title: "Users wrapper", to: "/users-wrapper" },
        { rules: [ACLRule.ROLES_LIST], title: "Roles", to: "/roles" },
    ];
}
</script>

<style lang="scss" scoped>
$navigation-drawer-mobile-temporary-elevation: 0;
</style>
<style>
html {
    overflow-y: auto;
}
</style>
