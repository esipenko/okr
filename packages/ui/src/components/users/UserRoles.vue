<template>
    <v-select
        v-if="rules.includes(ACLRule.ROLES_ASSIGN)"
        :value="item.role.roleId"
        item-text="name"
        item-value="roleId"
        :items="roles"
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

    ACLRule = ACLRule;
    get rules(): ACLRule[] {
        if (this.currentUser === undefined) {
            return [];
        }

        // const actionRules = [ACLRule.USERS_EDIT, ACLRule.USERS_DELETE];

        const rules = this.currentUser.role.rules;
        // const hideActions =
        //     rules.filter((r) => actionRules.includes(r)).length === 0;

        // if (hideActions) {
        //     this.$set(this.headers[4], "align", " d-none");
        // }

        return rules;
    }
}
</script>
