<template>
    <div>
        <h1>Projects</h1>
        <v-list v-if="projects.length > 0">
            <v-list-group
                v-for="project in projects"
                :key="project.projectId"
                no-action
                @click.native="getProjectUsers(project)"
            >
                <template v-slot:activator>
                    <v-list-item-title>{{ project.name }}</v-list-item-title>
                    <v-list-item-icon
                        @click.stop="openEditProjectForm(project)"
                    >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon>
                        <v-icon @click.prevent="deleteProject(project)"
                            >mdi-delete</v-icon
                        >
                    </v-list-item-icon>
                </template>

                <v-list-item
                    v-for="user in project.users"
                    :key="user.userId"
                    link
                >
                    <v-list-item-title
                        v-text="user.firstName + ' ' + user.lastName"
                    ></v-list-item-title>
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
                </v-list-item>
            </v-list-group>
        </v-list>
        <p v-else>
            Currently your company don't have any project. Create your first
            one!
        </p>

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
import { ProjectDto } from "../store/projects/project.types";

@Component({
    components: { ProjectsForm },
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

    mounted() {
        this.getProjects();
    }

    openEditProjectForm(project: ProjectDto) {
        this.projectForm.openEditForm(project);
    }

    getProjectUsers(project: ProjectDto) {
        if (project.users !== undefined) {
            return;
        }

        this.setProjectUsers(project);
    }
}
</script>
