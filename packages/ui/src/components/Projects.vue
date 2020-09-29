<template>
    <div>
        <h1>Projects</h1>
        <v-list>
            <v-list-group
                v-for="project in projects"
                :key="project.projectId"
                no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            project.name
                        }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="user in project.users" :key="user.userId">
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="user.firstName + ' ' + user.lastName"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <ProjectsForm @add-project="addProject" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectsForm from "./ProjectsForm.vue";
import { createProject, Project } from "../utils/test-data/project";

@Component({
    components: { ProjectsForm },
})
export default class Projects extends Vue {
    projects: Project[] = [];

    mounted() {
        for (let i = 0; i < 5; i++) {
            this.projects.push(createProject());
        }
    }

    addProject(project: Project) {
        project.projectId = createProject().projectId;

        this.projects.push(project);
    }
}
</script>
