import { ActionTree } from "vuex";
import axios from "axios";
import { RootState } from "../root.types";
import { UserState } from "./user.store";
import { User } from "../auth/auth.types";

export const userActions: ActionTree<UserState, RootState> = {
    getUsers({ commit }) {
        axios({
            url: `/api/user/all`,
            method: "GET",
        }).then((response) => {
            const payload: User[] = response && response.data;
            commit("setUsers", payload);
        });
    },
    deleteUser({ commit }, userId: number) {
        axios({
            url: `/api/user/${userId}`,
            method: "DELETE",
        }).then((response) => {
            const payload: User = response && response.data;
            commit("deleteUsers", payload);
        });
    },
};
