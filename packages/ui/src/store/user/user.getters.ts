import { GetterTree } from "vuex";
import { RootState } from "../root.types";
import { UserState } from "./user.store";

export const userGetters: GetterTree<UserState, RootState> = {
    users(state) {
        return state.users ?? [];
    },
};
