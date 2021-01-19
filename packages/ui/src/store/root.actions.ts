import { ActionTree } from "vuex";
import { RootState } from "./root.types";
export const desktopWidth = 540;

export const rootActions: ActionTree<RootState, RootState> = {
    updateIsMobile({ commit, getters }) {
        const { isMobile } = getters;
        const newIsMobile = document.body.clientWidth < desktopWidth;

        if (newIsMobile !== isMobile) {
            commit("setIsMolbile", newIsMobile);
        }
    },
};
