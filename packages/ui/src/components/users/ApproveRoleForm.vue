<template>
    <form-modal
        title="Assign role"
        action="Assign"
        :dialog="dialog"
        @submit="submit"
        @cancel="cancel"
    >
        Are you sure you want to assign role: {{ role.name }} to user
        {{ user.firstName + " " + user.lastName }}?
    </form-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Role } from "../../store/roles/roles.types";
import FormModal from "../FormModal.vue";
import { User } from "../../store/auth/auth.types";
import { Action } from "vuex-class";

@Component({
    components: { FormModal },
})
export default class ApproveRoleForm extends Vue {
    role = {} as Role;
    user = {} as User;
    dialog = false;
    @Action("assignRole") assignRole: any;

    openForm(user: User, role: Role) {
        this.user = { ...user };
        this.role = { ...role };
        this.dialog = true;
    }

    close() {
        this.dialog = false;
        this.role = {} as Role;
        this.user = {} as User;
    }

    submit() {
        this.assignRole({ roleId: this.role.roleId, userId: this.user.userId });
        this.close();
    }

    cancel() {
        this.$emit("cancel-role-assign", this.user);
        this.close();
    }
}
</script>
