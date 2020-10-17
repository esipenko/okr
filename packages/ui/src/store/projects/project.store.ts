import { Module } from "vuex";
import { RootState } from "../root.types";
import { projectGetters } from "./project.getters";
import { projectActions } from "./project.actions";
import { projectMutations } from "./project.mutations";
import { ProjectState } from "./project.types";

export const projectState: ProjectState = {
    projects: [],
};

export const projectStore: Module<ProjectState, RootState> = {
    state: projectState,
    getters: projectGetters,
    mutations: projectMutations,
    actions: projectActions,
};
