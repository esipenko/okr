<template>
    <v-select
        v-if="canEditRole"
        :value="input"
        item-text="name"
        item-value="roleId"
        :items="availableRoles"
        class="user-role-input"
        @change="updateRole(item, $event)"
    ></v-select>
    <span v-else>
        {{ item.role.name }}
    </span>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { DefaultRoles } from "shared/dist/acl.rules";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import { Role } from "../../store/roles/roles.types";

@Component
export default class UserRoles extends Vue {
    @Prop({ default: () => {} }) item!: User;
    @Getter("user") currentUser!: User;
    @Getter("roles") roles!: Role[];
    @Action("assignRole") assignRole: any;
    value = {} as Role;
    input = {} as Role;

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

    updateRole(user: User, roleId: number) {
        if (user.role.roleId === roleId) {
            return;
        }

        this.$emit("update-role", {
            user,
            roleId,
        });
    }

    @Watch("item", { immediate: true })
    onUserChange() {
        this.input = { ...this.item.role };
    }

    discard(user: User) {
        this.input = { ...user.role };
    }
}
</script>

<style scoped lang="scss">
.user-role-input {
    max-width: 150px;
}
</style>
