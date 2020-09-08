<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Email</label>
            <input v-model="email" required type="email" placeholder="Name" />
            <label>Password</label>
            <input
                v-model="password"
                required
                type="password"
                placeholder="Password"
            />
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    password = "";
    email = "";

    login() {
        const email = this.email;
        const password = this.password;
        this["$store"]
            .dispatch("login", { email, password })
            .then(() => this["$router"].push("/"))
            .catch((err) => console.log(err));
    }
}
</script>
