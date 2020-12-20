<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Edit user
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                            v-model="user.firstName"
                            :rules="[requiredRule('First name')]"
                            label="First name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="user.lastName"
                            :rules="[requiredRule('Last name')]"
                            label="Last name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="user.email"
                            :rules="[requiredRule('Email'), emailRule]"
                            label="email"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close"> cancel </v-btn>
                    <v-btn color="primary" text @click="submit"> edit </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import AccessControl from "../AccessControl.vue";
import { User } from "../../store/auth/auth.types";
import { Action } from "vuex-class";

@Component({
    components: { AccessControl },
})
export default class UserForm extends Vue {
    @Ref("form") from: any;
    @Action("editUser") editUser: any;

    dialog = false;
    user = {} as User;

    requiredRule(type: string) {
        return (v: string) => !!v || `${type} is required`;
    }

    openEditForm(user: User) {
        this.user = { ...user };
        this.dialog = true;
    }

    emailRule = (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid";
    submit() {
        if (this.from.validate() === false) {
            return;
        }

        this.editUser(this.user);
        this.close();
    }

    close() {
        this.dialog = false;
        this.user = {} as User;
    }
}
</script>
