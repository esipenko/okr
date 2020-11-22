<template>
    <span v-if="hasRole">
        <slot />
    </span>
</template>

<script lang="ts">
import { ACLRule } from "shared";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component
export default class AccessControll extends Vue {
    @Prop({ default: () => [] })
    accessRoles!: ACLRule[];
    @Getter("rules")
    userRoles!: ACLRule[];

    get hasRole(): boolean {
        return (
            this.accessRoles.length === 0 ||
            this.accessRoles.filter((r) => this.userRoles.includes(r))
                .length !== 0
        );
    }
}
</script>
