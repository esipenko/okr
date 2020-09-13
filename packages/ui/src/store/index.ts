import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { authStore } from "./auth/auth.store";
import { RootState } from "./root.types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        authStore,
    },
};

export default new Vuex.Store<RootState>(store);
