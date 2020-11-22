import { ActionTree } from "vuex";
import axios from "axios";
import { Role, RolesState } from "./roles.types";
import { RootState } from "../root.types";
import { User } from "../auth/auth.types";
// import router from "../../router";

export const rolesActions: ActionTree<RolesState, RootState> = {
    getRoles({ commit }) {
        commit("rolesRequest");
        axios({
            url: `${process.env.VUE_APP_URL}/role`,
            method: "get",
        }).then((response) => {
            const payload: Role = response && response.data;
            commit("setRoles", payload);
        });
    },
    assignRole({ commit }, { roleId, userId }) {
        axios({
            url: `${process.env.VUE_APP_URL}/role/${roleId}/assign/${userId}`,
            method: "post",
        }).then((response) => {
            const payload: User = response && response.data;
            commit("assignRole", payload);
        });
    },
};
