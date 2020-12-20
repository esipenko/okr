import { Module } from "vuex";
import { rootActions } from "./root.actions";
import { rootGetters } from "./root.getters";
import { rootMutations } from "./root.mutations";
import { RootState } from "./root.types";

const rootState: RootState = {
    isMobile: false,
};

export const rootStore: Module<RootState, RootState> = {
    state: rootState,
    getters: rootGetters,
    mutations: rootMutations,
    actions: rootActions,
};
