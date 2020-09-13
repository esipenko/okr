<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                    :src="require('../assets/logo.svg')"
                    class="my-3"
                    contain
                    height="200"
                />
            </v-col>

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Welcome to OKR</h1>

                <p class="subheading font-weight-regular">
                    Current user is {{ fullName }}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { User } from "../store/auth/auth.types";

@Component
export default class HelloWorld extends Vue {
    @Action("getCurrentUser")
    getCurrentUser: any;

    @Getter("user")
    user!: User;

    get fullName() {
        let firstName = "";
        let lastName = "";

        if (this.user) {
            firstName = this.user.firstName;
            lastName = this.user.lastName;
        } else {
            this.getCurrentUser();
        }

        return `${firstName} ${lastName}`;
    }
}
</script>
