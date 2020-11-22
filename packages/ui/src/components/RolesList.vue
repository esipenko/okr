<template>
    <div>
        <h1>Roles</h1>
        <v-list v-if="roles.length > 0">
            <v-list-group v-for="role in roles" :key="role.roleId" no-action>
                <template v-slot:activator>
                    <v-list-item-title>{{ role.name }}</v-list-item-title>
                    <AccessControl
                        v-if="role.companyId !== null"
                        :accessRoles="[ACLRule.ROLE_UPDATE]"
                    >
                        <v-list-item-icon
                            @click.stop="openEditProjectForm(project)"
                        >
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-list-item-icon>
                    </AccessControl>
                    <AccessControl
                        v-if="role.companyId !== null"
                        :accessRoles="[ACLRule.ROLE_DELETE]"
                    >
                        <v-list-item-icon>
                            <v-icon @click.prevent="deleteProject(project)"
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
            Currently your company don't have any project. Create your first
            one!
        </p>
        <RolesForm
            ref="rolesForm"
            @add-role="addRole"
            @edit-project="editProject"
        />
    </div>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ProjectDto } from "../store/projects/project.types";
import { Role } from "../store/roles/roles.types";
import AccessControl from "./AccessControl.vue";
import RolesForm from "./RolesForm.vue";

@Component({
    components: { AccessControl, RolesForm },
})
export default class RolesLits extends Vue {
    @Action("getRoles") getRoles: any;
    @Action("addProject") addProject: any;
    @Action("deleteUserFromProject") deleteUserFromProject: any;
    @Action("deleteProject") deleteProject: any;
    @Action("editProject") editProject: any;
    @Action("setProjectUsers") setProjectUsers: any;
    @Getter("roles") roles!: Role[];
    ACLRule: any = ACLRule;

    mounted() {
        this.getRoles();
    }

    getProjectUsers(project: ProjectDto) {
        if (project.users !== undefined) {
            return;
        }

        this.setProjectUsers(project);
    }

    addRole(role: Role) {
        console.log(role);
    }
}
</script>
