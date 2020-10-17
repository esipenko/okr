import { GetterTree } from "vuex";
import { RootState } from "../root.types";
import { ProjectState } from "./project.types";

export const projectGetters: GetterTree<ProjectState, RootState> = {
    projects(state) {
        return state.projects;
    },
    projectUsers(state) {
        return (id: number) =>
            state.projects.find((p) => p.projectId === id)?.users;
    },
};
