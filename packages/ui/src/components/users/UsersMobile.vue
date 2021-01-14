<template>
    <v-data-iterator :items="users" hide-default-footer hide-default-header>
        <template v-slot:default="props">
            <v-row>
                <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">
                            {{ item.firstName + " " + item.lastName }}
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>
                                    Email:
                                </v-list-item-content>
                                <v-list-item-content
                                    class="align-end email data"
                                >
                                    <div class="email">
                                        {{ item.email }}
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    Role:
                                </v-list-item-content>
                                <v-list-item-content class="align-end data">
                                    <user-roles
                                        :ref="item.userId"
                                        :item="item"
                                        @update-role="
                                            $emit('update-role', $event)
                                        "
                                    />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <template v-if="showActions">
                            <v-divider></v-divider>

                            <v-card-actions class="justify-end">
                                <users-actions
                                    :item="item"
                                    @edit-user="$emit('edit-user', $event)"
                                    @delete-user="$emit('delete-user', $evet)"
                                />
                            </v-card-actions>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-data-iterator>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { User } from "../../store/auth/auth.types";
import UsersActions from "./UsersActions.vue";
import UserRoles from "./UserRoles.vue";
import { ACLRule } from "shared";

@Component({ components: { UsersActions, UserRoles } })
export default class UsersMobile extends Vue {
    @Getter("user") currentUser!: User;

    @Prop({
        default: () => {
            return [];
        },
    })
    users!: User[];

    get showActions() {
        const actionRules = [ACLRule.USERS_EDIT, ACLRule.USERS_DELETE];
        const rules = this.currentUser.role.rules;
        return rules.some((r) => actionRules.includes(r));
    }

    discardRoleAssign(user: User) {
        (this.$refs[user.userId] as UserRoles[])[0].discard(user);
    }
}
</script>

<style scoped>
.email {
    flex-basis: 60%;
    text-overflow: ellipsis;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
}

.data {
    justify-content: flex-end;
}
</style>
