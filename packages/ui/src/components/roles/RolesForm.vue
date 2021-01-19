<template>
    <form-modal
        :title="isNewRole ? 'New role' : 'Edit role'"
        :action="isNewRole ? 'save' : 'edit'"
        :dialog="dialog"
        @submit="submit"
        @cancel="close"
    >
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
    </form-modal>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { intersectionWith } from "lodash";
import { ACLRule } from "shared";
import { Role } from "../../store/roles/roles.types";
import { Action } from "vuex-class";
import FormModal from "../FormModal.vue";

@Component({
    components: { FormModal },
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

    openForm(role?: Role) {
        this.dialog = true;

        if (role === undefined) {
            return;
        }

        this.role = { ...role };
        this.roleName = role.name;

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

    get isNewRole() {
        return this.role.name === undefined;
    }
}
</script>
