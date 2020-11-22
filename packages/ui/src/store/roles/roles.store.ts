import { Module } from "vuex";
import { RootState } from "../root.types";
import { rolesActions } from "./roles.actions";
import { rolesGetters } from "./roles.getters";
import { rolesMutations } from "./roles.mutations";
import { RolesState, LoadStatus } from "./roles.types";

export const rolesState: RolesState = {
    roles: undefined,
    status: LoadStatus.Success,
};

export const rolesStore: Module<RolesState, RootState> = {
    state: rolesState,
    getters: rolesGetters,
    actions: rolesActions,
    mutations: rolesMutations,
};
