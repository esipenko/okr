import { Module } from "vuex";
import { RootState } from "../root.types";
import { authActions } from "./auth.actions";
import { authGetters } from "./auth.getters";
import { authMutations } from "./auth.mutations";
import { AuthState } from "./auth.types";

export const authState: AuthState = {
    token: localStorage.getItem("token") || "",
    user: undefined,
    status: "Logout",
};

export const authStore: Module<AuthState, RootState> = {
    state: authState,
    getters: authGetters,
    actions: authActions,
    mutations: authMutations,
};
