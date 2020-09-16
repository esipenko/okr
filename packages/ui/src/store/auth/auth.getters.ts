import { GetterTree } from "vuex";
import { AuthState, AuthStatus, User } from "./auth.types";
import moment from "moment";
import { RootState } from "../root.types";

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
};
