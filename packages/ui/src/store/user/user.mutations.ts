import { MutationTree } from "vuex";
import { User } from "../auth/auth.types";
import { UserState } from "./user.store";

export const userMutations: MutationTree<UserState> = {
    setUsers(state, users: User[]) {
        state.users = [...users];
    },
};
