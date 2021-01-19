<template>
    <form-modal
        title="Delete"
        action="delete"
        :dialog="dialog"
        @submit="submit"
        @cancel="close"
    >
        Are you sure you want to delete user:
        {{ user.firstName + " " + user.lastName }}?
    </form-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormModal from "../FormModal.vue";
import { User } from "../../store/auth/auth.types";
import { Action } from "vuex-class";

@Component({
    components: { FormModal },
})
export default class ConfirmDeleteUserForm extends Vue {
    user = {} as User;
    dialog = false;
    @Action("deleteUser") deleteUser: any;

    openForm(user: User) {
        this.user = { ...user };
        this.dialog = true;
    }

    close() {
        this.dialog = false;
        this.user = {} as User;
    }

    submit() {
        this.deleteUser(this.user.userId);
        this.close();
    }
}
</script>
