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
            commit("deleteUser", payload);
        });
    },
    editUser({ commit, getters }, user: User) {
        axios({
            url: `/api/user/`,
            method: "PUT",
            data: user,
        }).then((response) => {
            const payload: User = response && response.data;

            const currentUser = getters.user;

            if (currentUser.userId === user.userId) {
                commit("updateCurrentUser", payload);
            }

            commit("updateUser", payload);
        });
    },
};
