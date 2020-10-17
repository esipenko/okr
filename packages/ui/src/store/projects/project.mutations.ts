import { MutationTree } from "vuex";
import { ProjectDto, ProjectState } from "./project.types";
import Vue from "vue";

export const projectMutations: MutationTree<ProjectState> = {
    setProjects(state, projects: ProjectDto[]) {
        state.projects = [...projects];
    },
    addProject(state, project: ProjectDto) {
        state.projects.push(project);
    },
    deleteUserFromProject(state, { projectId, userId }) {
        const { projects } = state;
        const projectIdx = projects.findIndex(
            (project) => project.projectId === projectId
        );

        if (projectIdx !== -1) {
            const { users } = projects[projectIdx];
            const newUsers = users.filter((user) => user.userId !== userId);
            Vue.set(projects[projectIdx], "users", newUsers);
        }
    },
    deleteProject(state, project) {
        const { projects } = state;
        const newProjects = projects.filter(
            (proj) => proj.projectId !== project.projectId
        );
        Vue.set(state, "projects", newProjects);
    },
    editProject(state, project) {
        const { projects } = state;

        const idx = projects.findIndex(
            (p) => p.projectId === project.projectId
        );

        if (idx !== -1) {
            Vue.set(state.projects, idx, project);
        }
    },
    setProjectUsers(state, { project, users }) {
        const { projects } = state;

        const newProject = projects.find(
            (p) => p.projectId === project.projectId
        );

        if (newProject === undefined) {
            return;
        }

        Vue.set(newProject, "users", users);
    },
};
