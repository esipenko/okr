<template>
    <div>
        <v-list v-if="roles.length > 0">
            <v-list-group v-for="role in roles" :key="role.roleId" no-action>
                <template v-slot:activator>
                    <v-list-item-title>{{ role.name }}</v-list-item-title>
                    <AccessControl
                        v-if="role.companyId !== null"
                        :accessRoles="[ACLRule.ROLES_UPDATE]"
                    >
                        <v-list-item-icon @click.stop="openEditRole(role)">
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-list-item-icon>
                    </AccessControl>
                    <AccessControl
                        v-if="role.companyId !== null"
                        :accessRoles="[ACLRule.ROLES_DELETE]"
                    >
                        <v-list-item-icon>
                            <v-icon @click.stop="deleteRole(role)"
                                >mdi-delete</v-icon
                            >
                        </v-list-item-icon>
                    </AccessControl>
                </template>

                <v-list-item
                    v-for="rule in role.rules"
                    :key="role.roleId + rule"
                >
                    <v-list-item-title v-text="rule"></v-list-item-title>
                </v-list-item>
            </v-list-group>
        </v-list>
        <p v-else>
            Currently your company don't have any role. Create your first one!
        </p>
        <RolesForm ref="rolesForm" />
    </div>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { Component, Vue, Ref } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { Role } from "../store/roles/roles.types";
import AccessControl from "./AccessControl.vue";
import RolesForm from "./RolesForm.vue";

@Component({
    components: { AccessControl, RolesForm },
})
export default class RolesLits extends Vue {
    @Action("getRoles") getRoles: any;
    @Action("addrole") addrole: any;
    @Action("deleteRole") deleteRole: any;
    @Action("editRole") editRole: any;
    @Getter("roles") roles!: Role[];
    @Ref("rolesForm") rolesForm!: RolesForm;

    ACLRule: any = ACLRule;

    mounted() {
        this.getRoles();
    }

    openEditRole(role: Role) {
        this.rolesForm.openEditForm(role);
    }
}
</script>
