<template>
    <div>
        <v-list v-if="projects.length > 0">
            <v-list-group
                v-for="project in projects"
                :key="project.projectId"
                no-action
                @click.native="getProjectUsers(project)"
            >
                <template v-slot:activator>
                    <v-list-item-title>{{ project.name }}</v-list-item-title>
                    <AccessControl :accessRoles="[ACLRule.PROJECTS_UPDATE]">
                        <v-list-item-icon
                            @click.stop="openEditProjectForm(project)"
                        >
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-list-item-icon>
                    </AccessControl>
                    <AccessControl :accessRoles="[ACLRule.PROJECTS_DELETE]">
                        <v-list-item-icon>
                            <v-icon @click.prevent="deleteProject(project)"
                                >mdi-delete</v-icon
                            >
                        </v-list-item-icon>
                    </AccessControl>
                </template>

                <v-list-item
                    v-for="user in project.users"
                    :key="user.userId"
                    link
                >
                    <v-list-item-title
                        v-text="user.firstName + ' ' + user.lastName"
                    ></v-list-item-title>
                    <AccessControl
                        :accessRoles="[ACLRule.PROJECTS_USERS_LIST_DELETE]"
                    >
                        <v-list-item-icon
                            @click="
                                deleteUserFromProject({
                                    projectId: project.projectId,
                                    userId: user.userId,
                                })
                            "
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                    </AccessControl>
                </v-list-item>
            </v-list-group>
        </v-list>
        <p v-else>
            Currently your company don't have any project. Create your first
            one!
        </p>
        <FloatingButton @click.native="projectForm.openForm()" />
        <ProjectsForm
            ref="projectForm"
            @add-project="addProject"
            @edit-project="editProject"
        />
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import ProjectsForm from "./ProjectsForm.vue";
import { Action, Getter } from "vuex-class";
import { ProjectDto } from "../../store/projects/project.types";
import AccessControl from "../AccessControl.vue";
import { ACLRule } from "shared";
import FloatingButton from "../FloatingButton.vue";

@Component({
    components: { ProjectsForm, AccessControl, FloatingButton },
})
export default class Projects extends Vue {
    @Action("getProjects") getProjects: any;
    @Action("addProject") addProject: any;
    @Action("deleteUserFromProject") deleteUserFromProject: any;
    @Action("deleteProject") deleteProject: any;
    @Action("editProject") editProject: any;
    @Action("setProjectUsers") setProjectUsers: any;
    @Getter("projects") projects!: ProjectDto[];
    @Ref("projectForm") projectForm!: ProjectsForm;
    ACLRule: any = ACLRule;

    mounted() {
        this.getProjects();
    }

    openEditProjectForm(project: ProjectDto) {
        this.projectForm.openForm(project);
    }

    getProjectUsers(project: ProjectDto) {
        if (project.users !== undefined) {
            return;
        }

        this.setProjectUsers(project);
    }
}
</script>
