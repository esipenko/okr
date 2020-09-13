import { ActionTree } from "vuex";
import axios from "axios";
import moment from "moment";
import { AuthState, LoginDto, User } from "./auth.types";
import { RootState } from "../root.types";
import router from "../../router";

export const authActions: ActionTree<AuthState, RootState> = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("authRequest");
            axios({
                url: `${process.env.VUE_APP_URL}/auth/login`,
                data: user,
                method: "POST",
            })
                .then((response) => {
                    const payload: LoginDto = response && response.data;
                    const { expiresIn, accessToken } = payload.token;

                    localStorage.setItem("token", `Bearer ${accessToken}`);
                    const expirationTime = moment().add(expiresIn, "s");
                    localStorage.setItem(
                        "expirationTime",
                        JSON.stringify(expirationTime.valueOf())
                    );
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;

                    commit("authSuccess", payload);
                    resolve(payload);
                })
                .catch((err) => {
                    commit("authError");
                    localStorage.removeItem("token");
                    reject(err.response.data);
                });
        });
    },
    registration({ commit }, user: User) {
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
                    reject(err.response.data);
                });
        });
    },
    logout({ commit }) {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/login");
    },
    getCurrentUser({ commit }) {
        if (this.getters["isLoggedIn"]) {
            axios({
                url: `${process.env.VUE_APP_URL}/user`,
                method: "GET",
            })
                .then((response) => {
                    const user: User = response && response.data;
                    commit("updateUser", user);
                })
                .catch(() => {
                    this.dispatch("logout");
                });
        }
    },
};
