<template>
    <v-select
        v-if="canEditRole"
        :value="item.role.roleId"
        item-text="name"
        item-value="roleId"
        :items="availableRoles"
        class="user-role-input"
        @input="
            assignRole({
                userId: item.userId,
                roleId: $event,
            })
        "
    ></v-select>
    <span v-else>
        {{ item.role.name }}
    </span>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { DefaultRoles } from "shared/dist/acl.rules";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import { Role } from "../../store/roles/roles.types";

@Component
export default class UserRoles extends Vue {
    @Prop({ default: () => {} }) item!: User;
    @Getter("user") currentUser!: User;
    @Getter("roles") roles!: Role[];
    @Action("assignRole") assignRole: any;

    get rules(): ACLRule[] {
        if (this.currentUser === undefined) {
            return [];
        }

        const rules = this.currentUser.role.rules;
        return rules;
    }

    get canEditRole() {
        return this.rules.includes(ACLRule.ROLES_ASSIGN);
    }

    get availableRoles() {
        const isAdmin =
            this.currentUser.userId === this.item.userId &&
            this.item.role.name === DefaultRoles.Administrator;

        if (isAdmin) {
            return this.roles.filter(
                (r) => r.name === DefaultRoles.Administrator
            );
        }

        return this.roles;
    }
}
</script>

<style scoped lang="scss">
.user-role-input {
    max-width: 150px;
}
</style>
