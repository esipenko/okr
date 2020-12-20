import { GetterTree } from "vuex";
import { RootState } from "./root.types";

export const rootGetters: GetterTree<RootState, RootState> = {
    isMobile(state) {
        return state.isMobile;
    },
};
