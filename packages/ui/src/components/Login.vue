<template>
    <v-container class="fill-height" fluid align-center>
        <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="8" md="4" lg="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-subtitle v-if="errorMessage" class="red--text">
                        {{ errorMessage }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                prepend-icon="mdi-account"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                label="Password"
                                prepend-icon="mdi-lock"
                                type="password"
                                required
                                :rules="passwordRules"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="goToRegistration"
                            >Go to registration</v-btn
                        >
                        <v-btn color="primary" class="mr-2" @click="submit"
                            >Login</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Login extends Vue {
    @Action("login")
    login: any;

    password = "";
    email = "";

    emailRules = [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    passwordRules = [(v: string) => !!v || "Password is required"];
    errorMessage = "";

    submit(): void {
        if (!(this.$refs as any).form.validate()) {
            return;
        }

        const { email, password } = this;

        this.login({ email, password })
            .then(() => this["$router"].push("/"))
            .catch((err: any) => {
                this.errorMessage = err.messagea;
            });
    }

    goToRegistration(): void {
        this["$router"].push("/registration");
    }
}
</script>
