<template>
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="roles.name"
        hide-default-footer
        class="elevation-1 users-item"
        :mobile-breakpoint="0"
    >
        <template v-slot:[`item.role`]="{ item }">
            <user-roles
                :ref="item.userId"
                :item="item"
                @update-role="$emit('update-role', $event)"
            />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <users-actions
                :item="item"
                @delete-user="$emit('delete-user', $event)"
                @edit-user="$emit('edit-user', $event)"
            />
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import UsersActions from "./UsersActions.vue";
import UserRoles from "./UserRoles.vue";
import { ACLRule } from "shared";

@Component({
    components: { UsersActions, UserRoles },
})
export default class UsersDesktop extends Vue {
    @Getter("user") currentUser!: User;

    @Prop({
        default: () => {
            return [];
        },
    })
    users!: User[];
    headers = [
        {
            text: "First name",
            align: "start",
            value: "firstName",
            sortable: false,
        },
        {
            text: "Last name",
            align: "start",
            value: "lastName",
            sortable: false,
        },
        { text: "Email", value: "email", sortable: false },
        { text: "Role", value: "role", sortable: false },
        {
            text: "Actions",
            value: "actions",
            sortable: false,
            align: "center",
        },
    ];

    @Watch("currentUser", { immediate: true })
    onUserUpdates() {
        if (this.currentUser === undefined) {
            return;
        }

        const actionRules = [ACLRule.USERS_EDIT, ACLRule.USERS_DELETE];

        const rules = this.currentUser.role.rules;
        const showActions = rules.some((r) => actionRules.includes(r));

        if (!showActions) {
            this.$set(this.headers[4], "align", " d-none");
        }
    }

    discardRoleAssign(user: User) {
        (this.$refs[user.userId] as UserRoles).discard(user);
    }
}
</script>

<style lang="scss">
.users-item {
    td {
        word-break: break-word;
        white-space: normal;
    }
}
</style>
