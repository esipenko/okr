<template>
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="roles.name"
        hide-default-footer
        class="elevation-1"
        :mobile-breakpoint="0"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Users</v-toolbar-title>
            </v-toolbar>
        </template>
        <template v-slot:[`item.role`]="{ item }">
            <user-roles :item="item" />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <users-actions :item="item" />
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
        },
        {
            text: "Last name",
            align: "start",
            value: "lastName",
        },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        {
            text: "Actions",
            value: "actions",
            sortable: false,
            align: "center",
        },
    ];

    @Watch("currentUser", { immediate: true })
    onUserUpdates() {
        const actionRules = [ACLRule.USERS_EDIT, ACLRule.USERS_DELETE];

        const rules = this.currentUser.role.rules;
        const hideActions =
            rules.filter((r) => actionRules.includes(r)).length === 0;

        if (hideActions) {
            this.$set(this.headers[4], "align", " d-none");
        }
    }
}
</script>
