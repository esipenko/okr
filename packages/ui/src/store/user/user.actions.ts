import { ActionTree } from "vuex";
import axios from "axios";
import { RootState } from "../root.types";
import { UserState } from "./user.store";
import { User } from "../auth/auth.types";
// import router from "../../router";

export const userActions: ActionTree<UserState, RootState> = {
    getUsers({ commit }) {
        axios({
            url: `${process.env.VUE_APP_URL}/user/all`,
            method: "GET",
        }).then((response) => {
            const payload: User[] = response && response.data;
            commit("setUsers", payload);
        });
    },
};
