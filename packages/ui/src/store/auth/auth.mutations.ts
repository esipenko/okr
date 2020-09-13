import { MutationTree } from "vuex";
import { AuthState, LoginDto, User } from "./auth.types";

export const authMutations: MutationTree<AuthState> = {
    authRequest(state) {
        state.status = "Loading";
    },
    authError(state) {
        state.status = "Error";
    },
    logout(state) {
        state.status = "Logout";
        state.token = "";
        state.user = undefined;
    },
    authSuccess(state, payload: LoginDto) {
        state.status = "Success";
        state.token = payload.token.accessToken;
        state.user = payload.user;
    },
    updateUser(state, user: User) {
        state.user = user;
    },
};
