<template>
    <div>
        <users-mobile
            v-if="isMobile"
            ref="mobile"
            :users="users"
            @edit-user="openForm($event)"
            @update-role="openApproveRoleForm($event.user, $event.roleId)"
            @delete-user="openConfirmDeleteUserForm($event)"
        />
        <users-desktop
            v-else
            ref="desktop"
            :users="users"
            @edit-user="openForm($event)"
            @update-role="openApproveRoleForm($event.user, $event.roleId)"
            @delete-user="openConfirmDeleteUserForm($event)"
        />
        <user-form ref="userForm" />
        <approve-role-form
            ref="approveRoleForm"
            @cancel-role-assign="discard"
        />
        <confirm-delete-user-form ref="confirmDeleteUser" />
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import UsersMobile from "./UsersMobile.vue";
import UsersDesktop from "./UsersDesktop.vue";
import UserForm from "./UserForm.vue";
import ApproveRoleForm from "./ApproveRoleForm.vue";
import { Role } from "../../store/roles/roles.types";
import ConfirmDeleteUserForm from "./ConfirmDeleteUserForm.vue";

@Component({
    components: {
        UsersMobile,
        UsersDesktop,
        UserForm,
        ApproveRoleForm,
        ConfirmDeleteUserForm,
    },
})
export default class Users extends Vue {
    @Getter("users") users!: User[];
    @Getter("roles") roles!: Role[];
    @Getter("isMobile") isMobile!: boolean;
    @Action("getUsers") getUsers: any;
    @Action("getRoles") getRoles: any;
    @Ref("userForm") userForm!: UserForm;
    @Ref("approveRoleForm") approveRoleForm!: ApproveRoleForm;
    @Ref("desktop") desktop!: UsersDesktop;
    @Ref("mobile") mobile!: UsersMobile;
    @Ref("confirmDeleteUser") confirmDeleteUser!: ConfirmDeleteUserForm;

    showApproveRoleFrom = "false";

    created() {
        this.getUsers();
        this.getRoles();
    }

    openForm(user: User) {
        this.userForm.openEditForm(user);
    }

    openApproveRoleForm(user: User, roleId: number) {
        const role = this.roles.find((r) => r.roleId === roleId);

        if (role === undefined) {
            return;
        }

        this.approveRoleForm.openForm(user, role);
    }

    discard(user: User) {
        if (this.desktop !== undefined) {
            this.desktop.discardRoleAssign(user);
            return;
        }

        this.mobile.discardRoleAssign(user);
    }

    openConfirmDeleteUserForm(user: User) {
        this.confirmDeleteUser.openForm(user);
    }
}
</script>
