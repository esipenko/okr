<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-subtitle v-if="errorMessage" class="red--text">
                        {{ errorMessage }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                v-model="firstName"
                                :rules="[requiredRule('First name')]"
                                label="First name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lastName"
                                :rules="[requiredRule('Last name')]"
                                label="Last name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="company"
                                :rules="[requiredRule('Company')]"
                                label="Company"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="passwordFiled"
                                v-model="password"
                                :rules="passwordRules"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="passwordConfirmationField"
                                v-model="passwordConfirmation"
                                label="Password confirmation"
                                :rules="passwordConfirmationRules"
                                type="password"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mr-4" @click="goToLogin"
                            >Go to login</v-btn
                        >
                        <v-btn color="primary" class="mr-4" @click="submit"
                            >Rgister</v-btn
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

@Component({})
export default class Register extends Vue {
    @Action("registration")
    registration: any;

    company = "";
    password = "";
    passwordConfirmation = "";
    email = "";
    firstName = "";
    lastName = "";
    errorMessage = "";

    requiredRule(type: string) {
        return (v: string) => !!v || `${type} is required`;
    }

    emailRules = [
        this.requiredRule("E-mail"),
        (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    passwordRules = [this.requiredRule("Password")];
    passwordConfirmationRules = [
        (v: string) =>
            (!!v && v) == (this.$refs as any).passwordFiled.value ||
            "Passwords mast match",
        this.requiredRule("Password confirmation"),
    ];

    goToLogin() {
        this.$router.push("/login");
    }

    submit() {
        if (!(this.$refs.form as any).validate()) {
            return;
        }

        const data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            company: this.company,
        };

        this.registration(data)
            .then(() => this.$router.push("/login"))
            .catch((err: any) => {
                this.errorMessage = err.message;
            });
    }
}
</script>
