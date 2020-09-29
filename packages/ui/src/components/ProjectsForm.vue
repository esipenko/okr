<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
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
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add project
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
                    <v-btn color="primary" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" text @click="submit"> accept </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { User } from "../store/auth/auth.types";
import { Project } from "../utils/test-data/project";
import createUser from "../utils/test-data/users";

@Component
export default class ProjectForm extends Vue {
    @Ref("form") from: any;

    dialog = false;
    projectName = "";
    users: User[] = [];
    selectedUsers: User[] = [];

    created() {
        for (let i = 0; i < Math.ceil(Math.random() * 6); i++) {
            this.users.push(createUser());
        }
    }

    projectRule = [(v: string) => !!v || "Project name required"];

    submit() {
        if (this.from.validate() === false) {
            return;
        }

        this.dialog = false;
        const newProject: Project = {
            name: this.projectName,
            users: [...this.selectedUsers],
        };

        this.$emit("add-project", newProject);
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
