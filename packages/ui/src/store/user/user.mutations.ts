import { MutationTree } from "vuex";
import { User } from "../auth/auth.types";
import { UserState } from "./user.store";

export const userMutations: MutationTree<UserState> = {
    setUsers(state, users: User[]) {
        state.users = [...users];
    },
    assignRole(state, user: User) {
        if (state.users === undefined) {
            state.users = [user];
        }

        const idx = state.users.findIndex((u) => u.userId === u.userId);

        if (idx === -1) {
            return;
        }

        state.users[idx] = { ...user };
    },
    deleteUser(state, user: User) {
        if (state.users === undefined) {
            return;
        }

        const newUsers = state.users.filter((u) => u.userId !== user.userId);

        state.users = [...newUsers];
    },
};
