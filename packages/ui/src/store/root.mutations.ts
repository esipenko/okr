import { MutationTree } from "vuex";
import { RootState } from "./root.types";

export const rootMutations: MutationTree<RootState> = {
    setIsMolbile(state, isMobile) {
        state.isMobile = isMobile;
    },
};
