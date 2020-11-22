import { GetterTree } from "vuex";
import { RolesState } from "./roles.types";
import { RootState } from "../root.types";
import { Role } from "./roles.types";

export const rolesGetters: GetterTree<RolesState, RootState> = {
    roles(state): Role[] {
        return state.roles ?? [];
    },
};
