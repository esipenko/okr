import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: {},
    },
    mutations: {
        authRequest(state) {
            state.status = "loading";
        },
        authError(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        },
        authSuccess(state: any, { token, user }) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("authRequest");
                axios({
                    url: `${process.env.VUE_APP_URL}/auth/login`,
                    data: user,
                    method: "POST",
                })
                    .then((resp) => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("authSuccess", token, user);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("authError");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("authRequest");
                axios({
                    url: `${process.env.VUE_APP_URL}/user/registration`,
                    data: user,
                    method: "POST",
                })
                    .then((resp) => {
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("authError", err);
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
    },
    modules: {},
    getters: {
        isLoggedIn: (state) => !!state.token,
        authStatus: (state) => state.status,
    },
});
