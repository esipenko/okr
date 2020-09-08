<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="firstName">First name</label>
            <div>
                <input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    required
                    autofocus
                />
            </div>
            <label for="lastName">Last name</label>
            <div>
                <input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    required
                    autofocus
                />
            </div>
            <label for="email">E-Mail Address</label>
            <div>
                <input id="email" v-model="email" type="email" required />
            </div>
            <label for="password">Password</label>
            <div>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                />
            </div>
            <label for="password-confirm">Confirm Password</label>
            <div>
                <input
                    id="password-confirm"
                    v-model="password_confirmation"
                    type="password"
                    required
                />
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Register extends Vue {
    password = "";
    password_confirmation = "";
    email = "";
    firstName = "";
    lastName = "";
    isAdmin = "";

    register() {
        const data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            isAdmin: this.isAdmin,
        };
        this["$store"]
            .dispatch("register", data)
            .then(() => this["$router"].push("/login"))
            .catch((err) => console.log(err));
    }
}
</script>
