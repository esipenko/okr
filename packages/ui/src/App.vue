<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link>

            <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
    get isLoggedIn(): boolean {
        return this["$store"].getters.isLoggedIn;
    }

    logout() {
        this["$store"].dispatch("logout").then(() => {
            this["$router"].push("/login");
        });
        console.log(process.env);
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
