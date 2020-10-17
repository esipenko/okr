import { Module } from "vuex";
import { User } from "../auth/auth.types";
import { RootState } from "../root.types";
import { userActions } from "./user.actions";
import { userGetters } from "./user.getters";
import { userMutations } from "./user.mutations";

export interface UserState {
    users: User[];
}

const userState: UserState = {
    users: [],
};

export const userStore: Module<UserState, RootState> = {
    state: userState,
    getters: userGetters,
    mutations: userMutations,
    actions: userActions,
};
