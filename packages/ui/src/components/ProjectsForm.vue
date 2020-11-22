<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <access-control :accessRoles="[ACLRule.PROJECTS_CREATE]">
                    <v-btn
                        color="rgba(14, 187, 218, 1)"
                        fab
                        large
                        dark
                        bottom
                        right
                        class="add-project-btn"
                        v-bind="attrs"
                        @click.native="dialog = true"
                        v-on="on"
                    >
                        <v-icon>mdi-plus-outline</v-icon>
                    </v-btn>
                </access-control>
            </template>

            <v-card>
                <v-card-title
                    v-if="project.name === undefined"
                    class="headline grey lighten-2"
                >
                    Add project
                </v-card-title>
                <v-card-title v-else class="headline grey lighten-2">
                    Edit project
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                            v-model="projectName"
                            :rules="projectRule"
                            label="Project name"
                            required
                        ></v-text-field>
                        <v-checkbox
                            v-for="user in users"
                            :key="user.userId"
                            v-model="selectedUsers"
                            :label="user.firstName + ' ' + user.lastName"
                            :value="user"
                        ></v-checkbox>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close"> cancel </v-btn>
                    <v-btn
                        v-if="project.name === undefined"
                        color="primary"
                        text
                        @click="submit"
                    >
                        save
                    </v-btn>
                    <v-btn v-else color="primary" text @click="submit">
                        edit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { User } from "../store/auth/auth.types";
import { Project } from "../utils/test-data/project";
import { intersectionWith } from "lodash";
import { ProjectDto } from "../store/projects/project.types";
import AccessControl from "./AccessControl.vue";
import { ACLRule } from "shared";

@Component({
    components: { AccessControl },
})
export default class ProjectForm extends Vue {
    @Ref("form") from: any;
    @Action("getUsers") getUsers: any;
    @Action("setProjectUsers") setProjectUsers: any;
    @Getter("users") users!: User[];
    @Getter("projects") projects!: ProjectDto[];
    @Getter("projectUsers") projectUsers: any;
    ACLRule: any = ACLRule;

    dialog = false;
    projectName = "";
    selectedUsers: User[] = [];
    project = {} as ProjectDto;

    openEditForm(project: ProjectDto) {
        this.project = project;
        this.projectName = project.name;
        this.dialog = true;

        if (project.users === undefined) {
            this.setProjectUsers(project).then(() => {
                this.updateSelectedUsers();
            });

            return;
        }

        this.updateSelectedUsers();
    }

    updateSelectedUsers() {
        this.selectedUsers = intersectionWith(
            this.users,
            this.projectUsers(this.project.projectId),
            (a: User, b: User) => a.userId === b.userId
        );
    }

    mounted() {
        this.getUsers();
    }

    projectRule = [(v: string) => !!v || "Project name required"];

    submit() {
        if (this.from.validate() === false) {
            return;
        }

        const newProject: Project = {
            projectId: this.project.projectId,
            name: this.projectName,
            users: [...this.selectedUsers],
        };

        if (this.project.name === undefined) {
            this.$emit("add-project", newProject);
        } else {
            this.$emit("edit-project", newProject);
        }

        this.close();
    }

    close() {
        this.dialog = false;
        this.selectedUsers = [];
        this.projectName = "";
        this.project = {} as ProjectDto;
    }
}
</script>

<style>
.add-project-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
}
</style>
