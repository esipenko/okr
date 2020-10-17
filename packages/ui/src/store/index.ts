import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { authStore } from "./auth/auth.store";
import { RootState } from "./root.types";
import { projectStore } from "./projects/project.store";
import { userStore } from "./user/user.store";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        authStore,
        projectStore,
        userStore,
    },
};

export default new Vuex.Store<RootState>(store);
