<template>
    <v-app>
        <v-app-bar app color="rgba(14, 187, 218, 1)" dark>
            <v-spacer></v-spacer>
            <v-btn
                v-if="isLoggedIn"
                color="rgba(14, 187, 218, 1)"
                class="ma-2"
                @click="logout"
                >Logout
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import HelloWorld from "./components/HelloWorld.vue";
@Component({
    components: { HelloWorld },
})
export default class App extends Vue {
    @Getter("isLoggedIn")
    isLoggedIn!: boolean;

    @Action("logout")
    logout!: any;
}
</script>
