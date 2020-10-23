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
                    Current workspace is {{ company.name }}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Company } from "../store/auth/auth.types";

@Component
export default class HelloWorld extends Vue {
    @Getter("company")
    company!: Company;
}
</script>
