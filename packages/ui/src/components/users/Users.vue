<template>
    <div class="users">
        <users-desktop class="users-deskotp" :users="users" />
        <users-mobile class="users-mobile" :users="users" />
    </div>
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

    created() {
        this.getUsers();
        this.getRoles();
    }
}
</script>

<style lang="scss" scoped>
.users {
    &-mobile {
        display: none;
    }

    @media (max-width: 540px) {
        &-deskotp {
            display: none;
        }
        &-mobile {
            display: block;
        }
    }
}
</style>
