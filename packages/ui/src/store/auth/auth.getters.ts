import { GetterTree } from "vuex";
import { AuthState, AuthStatus, Company, User } from "./auth.types";
import moment from "moment";
import { RootState } from "../root.types";
import { ACLRule } from "shared";

export const authGetters: GetterTree<AuthState, RootState> = {
    isLoggedIn(state): boolean {
        if (state.token) {
            const expiresAt = JSON.parse(
                localStorage.getItem("expirationTime")!
            );

            return moment().isBefore(expiresAt);
        }

        return false;
    },
    authStatus(state): AuthStatus {
        return state.status;
    },
    user(state): User | undefined {
        return state.user;
    },
    userName(state): string {
        return state.user
            ? `${state.user.firstName} ${state.user.lastName}`
            : "";
    },
    company(state): Company {
        return state.user ? state.user.company : ({} as Company);
    },
    rules(state): ACLRule[] {
        return state.user ? state.user.role.rules : [];
    },
};
