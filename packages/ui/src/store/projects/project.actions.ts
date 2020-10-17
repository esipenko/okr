import { ActionTree } from "vuex";
import axios from "axios";
import { RootState } from "../root.types";
// import router from "../../router";
import { ProjectDto, ProjectState } from "./project.types";
import { User } from "../auth/auth.types";

export const projectActions: ActionTree<ProjectState, RootState> = {
    getProjects({ commit }) {
        axios({
            url: `${process.env.VUE_APP_URL}/project`,
            method: "GET",
        }).then((response) => {
            const payload: ProjectDto[] = response && response.data;
            commit("setProjects", payload);
        });
    },
    addProject({ commit }, project) {
        axios({
            url: `${process.env.VUE_APP_URL}/project`,
            data: project,
            method: "post",
        }).then((response) => {
            const payload: ProjectDto = response && response.data;
            commit("addProject", payload);
        });
    },
    deleteUserFromProject({ commit }, { projectId, userId }) {
        axios({
            url: `${process.env.VUE_APP_URL}/project/${projectId}/delete-user/${userId}`,
            method: "DELETE",
        }).then((response) => {
            commit("deleteUserFromProject", { projectId, userId });
        });
    },
    deleteProject({ commit }, project) {
        axios({
            url: `${process.env.VUE_APP_URL}/project/${project.projectId}`,
            method: "DELETE",
        }).then((response) => {
            commit("deleteProject", project);
        });
    },
    editProject({ commit }, project) {
        axios({
            url: `${process.env.VUE_APP_URL}/project/${project.projectId}`,
            data: project,
            method: "put",
        }).then((response) => {
            commit("editProject", project);
        });
    },
    setProjectUsers({ commit }, project) {
        return axios({
            url: `${process.env.VUE_APP_URL}/project/${project.projectId}/users`,
            method: "GET",
        }).then((response) => {
            const users: User[] = response && response.data;
            commit("setProjectUsers", { project, users });
        });
    },
};
