<template>
    <users-mobile v-if="isMobile" :users="users" />
    <users-desktop v-else :users="users" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import UsersMobile from "./UsersMobile.vue";
import UsersDesktop from "./UsersDesktop.vue";

@Component({
    components: { UsersMobile, UsersDesktop },
})
export default class Users extends Vue {
    @Getter("users") users!: User[];
    @Action("getUsers") getUsers: any;
    @Action("getRoles") getRoles: any;

    width = 0;

    created() {
        this.getUsers();
        this.getRoles();
        this.onResize();
        window.addEventListener("resize", this.onResize);
    }

    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    }

    onResize() {
        this.width = document.body.clientWidth;
    }

    get isMobile() {
        return this.width < 540;
    }
}
</script>
