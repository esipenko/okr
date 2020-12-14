<template>
    <div>
        <access-control :accessRoles="[ACLRule.USERS_EDIT]">
            <v-icon small class="mr-2" @click="editUser(item)">
                mdi-pencil
            </v-icon>
        </access-control>
        <access-control :accessRoles="[ACLRule.USERS_DELETE]">
            <v-icon
                v-if="currentUser && item.userId !== currentUser.userId"
                user
                @click="deleteUser(item.userId)"
                >mdi-delete</v-icon
            >
        </access-control>
    </div>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import { Role } from "../../store/roles/roles.types";

@Component
export default class UsersActions extends Vue {
    @Getter("roles") roles!: Role;
    @Getter("user") currentUser!: User;
    @Prop({ default: () => {} }) item!: User;

    ACLRule: any = ACLRule;

    editUser(user: User) {
        console.log(user);
    }

    deleteUser(id: number) {
        console.log(id);
    }
}
</script>
