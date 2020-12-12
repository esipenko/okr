import { ActionTree } from "vuex";
import axios from "axios";
import { Role, RolesState } from "./roles.types";
import { RootState } from "../root.types";
import { User } from "../auth/auth.types";

export const rolesActions: ActionTree<RolesState, RootState> = {
    getRoles({ commit }) {
        commit("rolesRequest");
        axios({
            url: `/api/role`,
            method: "get",
        }).then((response) => {
            const payload: Role = response && response.data;
            commit("setRoles", payload);
        });
    },
    assignRole({ commit }, { roleId, userId }) {
        axios({
            url: `/api/role/${roleId}/assign/${userId}`,
            method: "post",
        }).then((response) => {
            const payload: User = response && response.data;
            commit("assignRole", payload);
        });
    },
    createRole({ commit }, role) {
        axios({
            url: `/api/role`,
            method: "post",
            data: role,
        }).then((response) => {
            const payload: User = response && response.data;
            commit("createRole", payload);
        });
    },
    deleteRole({ commit }, role) {
        axios({
            url: `/api/role/${role.roleId}`,
            method: "delete",
        }).then((response) => {
            const payload: Role = response && response.data;
            commit("deleteRole", payload);
        });
    },
    editRole({ commit }, role) {
        axios({
            url: `/api/role`,
            method: "put",
            data: role,
        }).then((response) => {
            const payload: User = response && response.data;
            commit("editRole", payload);
        });
    },
};
