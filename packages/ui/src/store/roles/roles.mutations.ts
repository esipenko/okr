import { MutationTree } from "vuex";
import { LoadStatus, RolesState } from "./roles.types";
import Vue from "vue";

export const rolesMutations: MutationTree<RolesState> = {
    rolesRequest(state) {
        state.status = LoadStatus.Loading;
    },
    rolesError(state) {
        state.status = LoadStatus.Failed;
    },
    setRoles(state, payload) {
        state.roles = payload;
        state.status = LoadStatus.Success;
    },
    createRole(state, payload) {
        state.roles?.push(payload);
    },
    deleteRole(state, payload) {
        const newRoles = state.roles?.filter(
            (f) => f.roleId !== payload.roleId
        );
        Vue.set(state, "roles", newRoles);
    },
    editRole(state, payload) {
        if (state.roles === undefined) {
            return;
        }

        const idx = state.roles?.findIndex((r) => r.roleId === payload.roleId);

        if (idx === -1) {
            return;
        }

        Vue.set(state.roles, idx, payload);
    },
};
