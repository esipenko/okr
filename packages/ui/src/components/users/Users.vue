<template>
    <div>
        <users-mobile
            v-if="isMobile"
            :users="users"
            @edit-user="openForm($event)"
        />
        <users-desktop v-else :users="users" @edit-user="openForm($event)" />
        <user-form ref="userForm" />
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import UsersMobile from "./UsersMobile.vue";
import UsersDesktop from "./UsersDesktop.vue";
import UserForm from "./UserForm.vue";

@Component({
    components: { UsersMobile, UsersDesktop, UserForm },
})
export default class Users extends Vue {
    @Getter("users") users!: User[];
    @Getter("isMobile") isMobile!: boolean;
    @Action("getUsers") getUsers: any;
    @Action("getRoles") getRoles: any;
    @Ref("userForm") userForm!: UserForm;

    created() {
        this.getUsers();
        this.getRoles();
    }

    openForm(user: User) {
        this.userForm.openEditForm(user);
    }
}
</script>
