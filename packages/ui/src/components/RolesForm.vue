<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <access-control :accessRoles="[ACLRule.ROLES_CREATE]">
                    <v-btn
                        color="rgba(14, 187, 218, 1)"
                        fab
                        large
                        dark
                        bottom
                        right
                        class="add-project-btn"
                        v-bind="attrs"
                        @click.native="dialog = true"
                        v-on="on"
                    >
                        <v-icon>mdi-plus-outline</v-icon>
                    </v-btn>
                </access-control>
            </template>

            <v-card>
                <v-card-title
                    v-if="role.name === undefined"
                    class="headline grey lighten-2"
                >
                    Add role
                </v-card-title>
                <v-card-title v-else class="headline grey lighten-2">
                    Edit role
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                            v-model="roleName"
                            :rules="nameRule"
                            label="Role name"
                            required
                        ></v-text-field>
                        <v-checkbox
                            v-for="rule in ACLRule"
                            :key="rule"
                            v-model="selectedRules"
                            :label="rule"
                            :value="rule"
                        ></v-checkbox>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close"> cancel </v-btn>
                    <v-btn
                        v-if="role.name === undefined"
                        color="primary"
                        text
                        @click="submit"
                    >
                        save
                    </v-btn>
                    <v-btn v-else color="primary" text @click="submit">
                        edit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { intersectionWith } from "lodash";
import AccessControl from "./AccessControl.vue";
import { ACLRule } from "shared";
import { Role } from "../store/roles/roles.types";
import { Action } from "vuex-class";

@Component({
    components: { AccessControl },
})
export default class RolesForm extends Vue {
    @Ref("form") from: any;
    @Action("createRole") createRole!: any;
    @Action("editRole") editRole!: any;

    ACLRule: any = ACLRule;

    dialog = false;
    roleName = "";
    selectedRules: ACLRule[] = [];
    role = {} as Role;

    openEditForm(role: Role) {
        this.role = { ...role };
        this.roleName = role.name;
        this.dialog = true;

        this.updateSelectedRules();
    }

    updateSelectedRules() {
        this.selectedRules = intersectionWith(
            this.role.rules,
            Object.keys(ACLRule) as ACLRule[]
        );
    }

    nameRule = [(v: string) => !!v || "Role name required"];

    submit() {
        if (this.from.validate() === false) {
            return;
        }

        const newRole: Role = {
            ...this.role,
            name: this.roleName,
            rules: [...this.selectedRules],
        };

        if (this.role.name === undefined) {
            this.createRole(newRole);
        } else {
            this.editRole(newRole);
        }

        this.close();
    }

    close() {
        this.dialog = false;
        this.selectedRules = [];
        this.roleName = "";
        this.role = {} as Role;
    }
}
</script>

<style>
.add-project-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
}
</style>
