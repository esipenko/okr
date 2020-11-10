<template>
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="roles.name"
        hide-default-footer
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Users</v-toolbar-title>
            </v-toolbar>
        </template>
        <template v-slot:item.role="{ item }">
            <v-select
                v-if="rules.includes(ACLRule.ROLES_ASSIGN)"
                :value="item.role.roleId"
                item-text="name"
                item-value="roleId"
                :items="roles"
                @input="assignRole({ userId: item.userId, roleId: $event })"
            ></v-select>
            <span v-else>
                {{ item.role.name }}
            </span>
        </template>
        <template v-slot:item.actions="{ item }">
            <access-control :accessRoles="[ACLRule.USERS_EDIT]">
                <v-icon small class="mr-2" @click="editUser(item)">
                    mdi-pencil
                </v-icon>
            </access-control>
            <access-control :accessRoles="[ACLRule.USERS_DELETE]">
                <v-icon
                    v-if="currentUser && item.userId !== currentUser.userId"
                    user
                    @click="deleteUser(item.userId)"
                    >mdi-delete</v-icon
                >
            </access-control>
        </template>
    </v-data-table>
</template>
<script lang="ts">
import { ACLRule } from "shared";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { User } from "../store/auth/auth.types";
import { Role } from "../store/roles/roles.types";
import AccessControl from "./AccessControl.vue";

@Component({
    components: { AccessControl },
})
export default class Users extends Vue {
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

    @Getter("users") users!: User[];
    @Action("getUsers") getUsers: any;
    @Getter("user") currentUser!: User;
    @Getter("roles") roles!: Role;
    @Action("getRoles") getRoles: any;
    @Action("assignRole") assignRole: any;
    @Action("deleteUser") deleteUser: any;
    ACLRule: any = ACLRule;

    get rules(): ACLRule[] {
        if (this.currentUser === undefined) {
            return [];
        }
        const actionRules = [ACLRule.USERS_EDIT, ACLRule.USERS_DELETE];

        const rules = this.currentUser.role.rules;
        const hideActions =
            rules.filter((r) => actionRules.includes(r)).length === 0;

        if (hideActions) {
            this.$set(this.headers[4], "align", " d-none");
        }

        return rules;
    }

    created() {
        this.getUsers();

        if (this.rules.includes(ACLRule.ROLES_LIST)) {
            this.getRoles();
        }
    }

    editUser(user: User) {
        console.log(user);
    }
}
</script>
